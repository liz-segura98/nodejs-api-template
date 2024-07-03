import { RequestHandler, Request, Response } from "express";
import { ApiErrorResponse } from "../../shared/interfaces/api-response.interface";
import { config } from "../../config";
const jwt = require('jsonwebtoken');

export const AuthenticationHandler: RequestHandler = (req: Request, res: Response, next) => {
  const { i18n } = res.locals;
  const notAuthorized: ApiErrorResponse = {
    error: i18n.__('auth.errors.not-authorized'),
    details: [i18n.__('auth.errors.not-authorized'),]
  };

  const authHeader: string | undefined = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send(notAuthorized);
  }
  
  const token: string = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send(notAuthorized);
  }

  jwt.verify(token, config.jwt.secret, (err: Error, data: { id: number }) => {
    if (err) {
      return res.status(401).send(notAuthorized);
    }

    res.locals.userId = data.id;
    next();
  });
};