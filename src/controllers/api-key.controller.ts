import { Request, Response } from 'express';
import { Countries, users } from '../shared/constants';
import { ErrorCode } from '../shared/enums';
import { BadRequestError, ConflictError } from '../shared/errors';
import { ApiResponse } from '../shared/interfaces/api-response.interface';
import { genAPIKey } from '../shared/utils';

class APIKeyControllerClass {
  register = (req: Request, res: Response) => {
    const { i18n } = res.locals;
    const { username } = req.body;

    if (!username) {
      throw new BadRequestError({
        message: i18n.__('api-key.user.no-username'),
        context: [i18n.__('api-key.user.no-username'),],
        code: ErrorCode.INVALID_REQUEST
      });
    }

    const today: string = new Date().toISOString().split('T')[0];
    const user = {
      _id: Date.now(),
      apiKey: genAPIKey(),
      username: username,
      usage: [{ date: today, count: 0 }],
      maxRequest: 5,
    };
    users.push(user);

    const response: ApiResponse<any> = {
      message: i18n.__('api-key.user.created-success'),
      data: user,
    }
    res.status(201).send(response);
  }

  getCountry = (req: Request, res: Response) => {
    const { i18n } = res.locals;

    const response: ApiResponse<any> = {
      message: i18n.__('api-key.country.list'),
      data: Countries,
    }
    res.status(201).send(response);
  }

  registerCountry = (req: Request, res: Response) => {
    const { i18n } = res.locals;
    const { country: name } = req.body;
    if (!name) {
      throw new BadRequestError({
        message: i18n.__('api-key.country.no-name'),
        context: [i18n.__('api-key.country.no-name'),],
        code: ErrorCode.INVALID_REQUEST
      });
    }

    const existCountry = Countries.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (!existCountry) {
      throw new ConflictError({
        message: i18n.__('api-key.country.already-exist', { name }),
        context: [i18n.__('api-key.country.already-exist', { name }),],
        code: ErrorCode.INVALID_REQUEST
      });
    }

    const country = {
      _id: Date.now(),
      name,
    };
    Countries.push(country);

    const response: ApiResponse<any> = {
      message: i18n.__('api-key.country.create-success'),
      data: country,
    }
    res.status(201).send(response);
  }
}

export const ApiKeyController = new APIKeyControllerClass();