import "reflect-metadata";
import express from "express";

import "./database/connection";

import routes from "./routes";
import uploadConfig from "./config/uploadConfig";

const server = express();

server.use(express.json());
server.use(routes);
server.use("/files", express.static(uploadConfig.directory));

server.listen(3333, () => {
  console.log("Server Started");
});
