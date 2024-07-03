import { RequestHandler, Request, Response } from "express";
import { LOCALES } from "../../shared/constants";
const { I18n } = require('i18n');
import path from 'path';

// Replace this with your own route
const LocalesPath: string = '../../../static/locales';

// This will return data in user's language
export const TranslateHandler: RequestHandler = (req: Request, res: Response, next) => {
  const acceptLanguage: string = req.headers['accept-language'] || LOCALES.ENGLISH;
  
  const i18n = new I18n({
    locales: [
      LOCALES.ENGLISH,
      LOCALES.SPANISH,
    ],
    directory: path.join(__dirname, LocalesPath),
    objectNotation: true,
    defaultLocale: acceptLanguage,
  });

  res.locals.i18n = i18n;
  next();
}