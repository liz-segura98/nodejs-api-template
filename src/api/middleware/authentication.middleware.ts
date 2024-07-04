import { RequestHandler, Request, Response, NextFunction } from "express";
import { config } from "../../config";
import { UnauthorizedError } from "../../shared/errors";


const jwt = require('jsonwebtoken');

export const AuthenticationHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { i18n } = res.locals;
  const authHeader: string | undefined = req.headers['authorization'];

  if (!authHeader) {
    throw new UnauthorizedError({ message: i18n.__('auth.errors.not-authorized'), context: [i18n.__('auth.errors.not-authorized')] });
  }
  
  const token: string = authHeader.split(' ')[1];
  if (!token) {
    throw new UnauthorizedError({ message: i18n.__('auth.errors.not-authorized'), context: [i18n.__('auth.errors.not-authorized')] });
  }

  jwt.verify(token, config.jwt.secret, (err: Error, data: { id: number }) => {
    if (err) {
      throw new UnauthorizedError({ message: i18n.__('auth.errors.not-authorized'), context: [i18n.__('auth.errors.not-authorized')] });
    }

    res.locals.userId = data.id;
    next();
  });
};