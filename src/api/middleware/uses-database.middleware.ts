import { RequestHandler, Request, Response } from "express";
import { config } from "../../config";
import { ServiceUnavailableError } from "../../shared/errors";
import { ErrorCode } from "../../shared/enums";

export const UsesDatabaseHandler: RequestHandler = (req: Request, res: Response, next) => {
  const { i18n } = res.locals;
  if (!config.database.useDatabase) {
    throw new ServiceUnavailableError({
      message: i18n.__('general.errors.no-database'),
      context: [i18n.__('general.errors.no-database')],
      code: ErrorCode.DATABASE_DOWN,
    });
  }
  next();
};