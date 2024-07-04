import { RequestHandler, Request, NextFunction } from "express";

import { hash, unhash } from "../../shared/utils";
import { UnauthorizedError } from "../../shared/errors";

export const HashHandler: RequestHandler = (req: Request, res: any, next: NextFunction) => {
  const { i18n } = res.locals;
  const method = req.method

  if (method === 'GET')
    return next()

  const { hashedBody } = req.body;

  if (!hashedBody) {
    throw new UnauthorizedError({
      message: i18n.__('general.errors.invalid-data'),
      context: [i18n.__('general.errors.invalid-data')],
    });
  }

  const unsHashedBody: string = unhash(hashedBody);
  req.body = JSON.parse(unsHashedBody);


  let originalSend = res.send;

  res.send = function () {
    const hashed = {
      data: hash(JSON.stringify(arguments[0]))
    }
    arguments[0] = JSON.stringify(hashed);
    originalSend.apply(res, arguments);
  };

  return next()
}