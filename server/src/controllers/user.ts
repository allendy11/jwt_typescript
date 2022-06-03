import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import logging from "../config/logging";
import bcryptjs from "bcryptjs";
import IUuser from "../interfaces/user";

const NAMESPACE = "User";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Token validated, user authorized.");
  return res.status(200).json({
    message: "Token validated",
  });
};

const register = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  bcryptjs.hash(password, Number(process.env.BCRYPT_SALT), (err, hash) => {
    if (err) {
      return res.status(401).json({
        message: err.message,
        error: err,
      });
    }
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {};

export default { validateToken, register, login, getAllUsers };
