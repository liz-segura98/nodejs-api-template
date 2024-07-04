import { RequestHandler, Request, Response, NextFunction } from "express";
import { users } from '../../shared/constants';
import { TooManyRequestError, UnauthorizedError } from "../../shared/errors";
import { ErrorCode } from "../../shared/enums";

const API_KEY_PROPERTY = "x-api-key";

export const AuthenticateKeyHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { i18n } = res.locals;
  const apiKey = req.header(API_KEY_PROPERTY);

  const account = users.find((user) => user.apiKey == apiKey);
  if (!account) {
    throw new UnauthorizedError({
      message: i18n.__('auth.errors.not-authorized'),
      context: [i18n.__('auth.errors.not-authorized')],
      code: ErrorCode.INVALID_API_KEY
    });
  }

  const today: string = new Date().toISOString().split("T")[0];
  const todayIdx = account.usage.findIndex((day) => day.date == today);

  // If hasn't used today, create record and continue
  if (todayIdx < 0) {
    account.usage.push({ date: today, count: 1 });
    return next();
  }

  if (account.usage[todayIdx].count >= account.maxRequest) {
    // Stop if the usage exceeds max API calls
    throw new TooManyRequestError({
      message: i18n.__('api-key.errors.too-many-request'),
      context: [i18n.__('api-key.errors.too-many-request')],
    });
  }
  
  account.usage[todayIdx].count++;
  return next();
};