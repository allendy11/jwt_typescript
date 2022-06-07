import jwt from "jsonwebtoken";
import config from "../config/config";
import logging from "../config/logging";
import IUser from "../interfaces/user";

const NAMESPACE = "Auth";

const signJWT = (
  user: IUser,
  cb: (error: Error | null, token: string | null | undefined) => void
): void => {
  logging.info(NAMESPACE, `Attempting to sign token for ${user.email}`);
  try {
    jwt.sign(
      { email: user.email },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: config.server.token.expireTime,
      },
      (error, token) => {
        if (error) {
          cb(error, null);
        } else {
          cb(null, token);
        }
      }
    );
  } catch (error: any) {
    logging.error(NAMESPACE, error.message);
    cb(error, null);
  }
};

export default signJWT;
