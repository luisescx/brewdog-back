import "express-async-errors";
import { AppDataSource } from "./data-source";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

AppDataSource.setOptions({ host: "database" });

AppDataSource.initialize()
  .then(async (options) => {
    const app = express();

    app.use(express.json());

    app.use(router);

    app.listen(3333, () => console.log("Server is running!"));

    app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        nextFunction: NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            message: err.message,
          });
        }

        return response.status(500).json({
          status: "error",
          message: `Internal server error - ${err.message}`,
        });
      }
    );
  })
  .catch((error) => console.log(error));
