import { Router } from 'express';
import { ApiKeyController } from '../../controllers/api-key.controller';
import { HashHandler } from '../middleware/hashing.middleware';
const route: Router = Router();

// Export '/hash' version of current API, with all sub request
export function hashRoutes(app: Router): void {
  app.use('/hash', route);

  route.post('/register', HashHandler,ApiKeyController.register)

  route.get('/country', HashHandler,ApiKeyController.getCountry);

  route.post('/country', HashHandler,ApiKeyController.registerCountry);
}