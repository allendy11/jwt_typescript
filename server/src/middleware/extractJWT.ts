import jwt from "jsonwebtoken";
import logging from "../config/logging";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

const NAMESPACE = "Auth";
const secret = process.env.ACCESS_SECRET || "access_secret";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Validating token");

  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          message: err,
          err,
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default extractJWT;
