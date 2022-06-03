import http from "http";
import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import userRouter from "./routes/userRouter";
import logging from "./config/logging";

const NAMESPACE = "Server";
const port = process.env.PORT || 4000;
const app = express();

// common middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// log
app.use(morgan("dev"));
app.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}]`);
  next();
});

// basic request
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});

// routes
app.use("/user", userRouter);

// start server
app.listen(port, () => {
  console.log(`listen on ${port}`);
});
