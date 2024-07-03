import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { ApiErrorResponse, ApiResponse } from '../shared/interfaces/api-response.interface';
import bcrypt from 'bcrypt';
import { config } from '../config';
import { ILoginResponse, ILoginRequest, IMeResponse } from '../models/auth';
const jwt = require('jsonwebtoken');

class AuthControllerClass {
  login = async (req: Request, res: Response) => {
    const { i18n } = res.locals;
    const { email, password }: ILoginRequest = req.body;

    const user = await userService.getUser({ email });
    if (!user) {
      const notFound: ApiErrorResponse = {
        error: i18n.__('auth.errors.not-found'),
        details: [i18n.__('auth.errors.not-found'),]
      };
      return res.status(404).send(notFound);
    }

    const passwordValid: boolean = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      const invalid: ApiErrorResponse = {
        error: i18n.__('auth.login.bad-credentials'),
        details: [i18n.__('auth.login.bad-credentials'),]
      };
      return res.status(401).json(invalid);
    }

    const token: string = jwt.sign({ id: user.id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const response: ApiResponse<ILoginResponse> = {
      message: i18n.__('auth.login.success'),
      data: {
        accessToken: token
      },
    }
    res.status(200).send(response);
  }

  me = async (req: Request, res: Response) => {
    const { i18n, userId: id } = res.locals;

    const user = await userService.getUser({ id });
    if (!user) {
      const notFound: ApiErrorResponse = {
        error: i18n.__('auth.errors.not-found'),
        details: [i18n.__('auth.errors.not-found'),]
      };
      return res.status(404).send(notFound);
    }
    
    const response: ApiResponse<IMeResponse> = {
      message: i18n.__('auth.login.success'),
      data: user,
    }
    res.status(200).send(response);
  }
}

export const AuthController = new AuthControllerClass();
