import { json, urlencoded } from "body-parser";
import express, { Response } from "express";
import morgan from "morgan";
import cors from "cors";

export const createServer = (): express.Application => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/", (_, res: Response) => {
      res.json({ message: "Hello World" });
    });

  return app;
};
