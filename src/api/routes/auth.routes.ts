import { Router } from 'express';
import { AuthController } from '../../controllers';

const route: Router = Router();

// Export '/auth' version of current API, with all sub request
export default (app: Router) => {
  app.use('/auth', route);

  route.post('/register', AuthController.registerUser);
};
