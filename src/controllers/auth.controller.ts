import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { ApiResponse } from '../shared/interfaces/api-response.interface';
import bcrypt from 'bcrypt';
import { config } from '../config';
import { ILoginResponse, ILoginRequest, IMeResponse } from '../models/auth';
import { NotFoundError, UnauthorizedError } from '../shared/errors';
const jwt = require('jsonwebtoken');

class AuthControllerClass {
  login = async (req: Request, res: Response) => {
    const { i18n } = res.locals;
    const { email, password }: ILoginRequest = req.body;

    const user = await userService.getUser({ email });
    if (!user) {
      throw new NotFoundError({
        message: i18n.__('auth.errors.not-found'),
        context: [i18n.__('auth.errors.not-found'),]
      });
    }

    const passwordValid: boolean = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedError({
        message: i18n.__('auth.login.bad-credentials'),
        context: [i18n.__('auth.login.bad-credentials'),]
      });
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
      throw new NotFoundError({
        message: i18n.__('auth.errors.not-found'),
        context: [i18n.__('auth.errors.not-found'),]
      });
    }
    
    const response: ApiResponse<IMeResponse> = {
      message: i18n.__('auth.login.success'),
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }
    res.status(200).send(response);
  }
}

export const AuthController = new AuthControllerClass();
