import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import bcryptjs from "bcryptjs";
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
  //! TODO: insert user into db
};

// login
const login = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "");
};

// get all users for manager
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "");
};

export default {
  validateToken,
  register,
  login,
  getAllUsers,
};
