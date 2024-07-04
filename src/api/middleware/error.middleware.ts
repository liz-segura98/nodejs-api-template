import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../shared/errors";
import { ApiErrorDetailResponse } from "../../shared/interfaces/api-response.interface";
import { ErrorCode } from "../../shared/enums/error.enum";

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handled errors
  if (err instanceof CustomError) {
    const { statusCode, errors, logging, message } = err;
    if (logging) {
      console.error(
        JSON.stringify({
        code: err.statusCode,
        errors: err.errors,
        stack: err.stack,
      }, null, 2));
    }

    return res.status(statusCode).send({ message, errors });
  }

  const e: ApiErrorDetailResponse = {
    code: ErrorCode.INTERNAL_SERVER,
    status: 500,
    message: err.name,
    details: [err.message]
  }

  // If it is an error we do not create, we must print the error
  console.error(
    JSON.stringify({
      code: e.status,
      errors: e,
      stack: err.stack,
    }, null, 2)
  );

  return res.status(e.status).send({ message: "Something went wrong", errors: e });
};