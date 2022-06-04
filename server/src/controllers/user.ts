import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import bcryptjs from "bcryptjs";
import signJWT from "../functions/signJWT";
import { Connect, Query } from "../config/mysql";
import IMySQLResult from "../interfaces/result";
import IUser from "../interfaces/user";

const NAMESPACE = "User";

// verify token
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Token validated, user authorized");
  res.status(200).json({
    message: "Authorized",
  });
};

// signup
const register = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  // hashing password
  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }
  });
  let query = `INSERT INTO users (username, password) values ('${username}','${password}')`;
  Connect().then((connection: any) => {
    Query<IMySQLResult>(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "User with id ${result.insertId} inserted");

        return res.status(201).json(result);
      })
      .catch((error) => {
        logging.error(NAMESPACE, error.message);
        return res.status(500).json({
          message: error.message,
          error,
        });
      })
      .catch((error) => {
        logging.error(NAMESPACE, error.message);
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  });
};

// login
const login = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  Connect()
    .then((connection: any) => {
      Query<IUser[]>(connection, query)
        .then((users: any) => {
          bcryptjs.compare(password, users[0].password, (error, result) => {
            if (error) {
              return res.status(401).json({
                message: "Password Mismatch",
                error,
              });
            } else {
              signJWT(users[0], (error, token) => {
                if (error) {
                  return res.status(401).json({
                    message: "Unable to sign JWT",
                    error,
                  });
                } else {
                  return res.status(200).json({
                    message: "Auth successful",
                    token,
                    user: users[0],
                  });
                }
              });
            }
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message);
          return res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message);
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

// get all users for manager
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  const query = `SELECT * FROM users`;
  Connect()
    .then((connection: any) => {
      Query<IUser[]>(connection, query)
        .then((users: any) => {
          res.status(200).json({
            message: "Get all user successful",
            users,
            count: users.length,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message);
          return res.status(500).json({
            message: error.message,
            error,
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message);
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default {
  validateToken,
  register,
  login,
  getAllUsers,
};
