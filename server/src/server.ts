import http from "http";
import express, { Request, Response, NextFunction, request } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import config from "./config/config";
import logging from "./config/logging";
import userRouter from "./routes/user";

const NAMESPACE = "Server";
const app = express();

// log the request
app.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(
    NAMESPACE,
    `[METHOD: ${req.method}] - [URL: ${req.url}] - [IP: ${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `[METHOD: ${req.method}] - [URL: ${req.url}] - [STATUS: ${res.statusCode}] - [IP: ${req.socket.remoteAddress}]`
    );
  });

  next();
});

// common modules
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

// routes
app.use("/user", userRouter);

// error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not found");
  res.status(404).json({
    message: error.message,
  });
});

// server start
const server = http.createServer(app);
server.listen(config.server.port, () => {
  logging.info(
    NAMESPACE,
    `Server is running ${config.server.host} : ${config.server.port}`
  );
});
