import "reflect-metadata";
import express, { Request, Response, NextFunction, response } from "express";
import "express-async-errors";

import "./database/connection";

import routes from "./routes";
import uploadConfig from "./config/uploadConfig";
import AppError from "./errors/AppError";

const server = express();

server.use(express.json());
server.use(routes);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

server.use("/files", express.static(uploadConfig.directory));

server.listen(3333, () => {
  console.log("Server Started");
});
