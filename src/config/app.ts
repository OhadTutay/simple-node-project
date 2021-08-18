import express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";

config();
const app = express();
const server = http.createServer(app);

export const startServer = async (port: number) => {
  app.use(cors());
  app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      extended: false,
      limit: "50mb",
    })
  );

  const routes = require("../routes").default;

  //Set all routes from routes folder
  app.use("/", routes);

  // Wait for the server to listen
  await new Promise<void>((resolve) => {
    server.listen(port, () => {
      console.log(`Server started on port ${port}!`);
      resolve();
    });
  });
};

export const stopServer = async () => {
  server.close();
};
