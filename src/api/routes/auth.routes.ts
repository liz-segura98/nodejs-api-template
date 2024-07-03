import { Router } from 'express';
import { AuthController } from '../../controllers';
import { LoginRequest } from '../../models/auth';
import { ValidationLocation } from '../../shared/enums';
import { AuthenticationHandler, ValidationHandler } from '../middleware';

const route: Router = Router();

// Export '/auth' version of current API, with all sub request
export function authRoutes(app: Router): void {
  app.use('/auth', route);

  // Validate credentials of user
  route.post(
    '/login',
    ValidationHandler([{ schema: LoginRequest, location: ValidationLocation.BODY }]),
    AuthController.login,
  );

  // Return data of current token
  route.get(
    '/me',
    AuthenticationHandler,
    AuthController.me,
  );
};
