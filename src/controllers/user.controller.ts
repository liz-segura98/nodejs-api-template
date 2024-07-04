import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { ApiResponse } from '../shared/interfaces/api-response.interface';
import { User } from '../models/user';
import { hash } from 'bcrypt';
import { ConflictError } from '../shared/errors';

class UserControllerClass {
  registerUser = async (req: Request, res: Response) => {
    const { i18n } = res.locals;
    const { email } = req.body;

    const existUser: User | null = await userService.getUser({ email });
    if (existUser) {
      throw new ConflictError({
        message: i18n.__('user.create-user.email-used'),
        context: [i18n.__('user.create-user.email-used'),]
      });
    }

    const data = {
      email: req.body.email,
      password: await hash(req.body.password, 15),
      name: req.body.name,
    }
    const created: User = await userService.createUser(data);

    const response: ApiResponse<number> = {
      message: i18n.__('user.create-user.success'),
      data: created.id,
    }
    res.status(201).send(response);
  }
}

export const UserController = new UserControllerClass();