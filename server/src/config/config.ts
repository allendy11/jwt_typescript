import dotenv from "dotenv";

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "root";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "jwt_typescript";

const mysql = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};

const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "coolissuer";
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || "30m";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "serversecret";

const server = {
  host: SERVER_HOST,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};
const config = {
  mysql,
  server,
};

export default config;
