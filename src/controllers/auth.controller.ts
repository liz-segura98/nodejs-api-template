import { Request, Response } from 'express';


class AuthControllerClass {
  login = async (req: Request, res: Response) => {
    const { i18n } = res.locals;

    res.json(i18n.__('test'));
  }
}

export const AuthController = new AuthControllerClass();
