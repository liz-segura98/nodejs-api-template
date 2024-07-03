import { Router } from 'express';
import { AuthController } from '../../controllers';

const route: Router = Router();

// Export '/auth' version of current API, with all sub request
export function authRoutes(app: Router): void {
  app.use('/auth', route);

  route.post('/login', AuthController.login);
};
