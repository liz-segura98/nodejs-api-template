import { Router } from 'express';
import { UserController } from '../../controllers';
import { UsesDatabaseHandler, ValidationHandler } from '../middleware';
import { RegisterUserValidate } from '../../models/user';
import { ValidationLocation } from '../../shared/enums/validation.enum';

const route: Router = Router();

// Export '/user' version of current API, with all sub request
export function userRoutes(app: Router): void {
  app.use('/user', route);

  // Creates new user
  route.post(
    '/register',
    UsesDatabaseHandler,
    ValidationHandler([{ schema: RegisterUserValidate, location: ValidationLocation.BODY }]),
    UserController.registerUser
  );
};