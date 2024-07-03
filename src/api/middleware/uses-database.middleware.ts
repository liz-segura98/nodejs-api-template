import { RequestHandler, Request, Response } from "express";
import { config } from "../../config";
import { ApiErrorResponse } from "../../shared/interfaces/api-response.interface";

export const UsesDatabaseHandler: RequestHandler = (req: Request, res: Response, next) => {
  const { i18n } = res.locals;
  if (!config.database.useDatabase) {
    const notAuthorized: ApiErrorResponse = {
      error: i18n.__('general.errors.no-database'),
      details: [i18n.__('general.errors.no-database'),]
    };

    return res.status(401).send(notAuthorized);
  }
  next();
};