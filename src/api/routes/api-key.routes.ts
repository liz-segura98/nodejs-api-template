import { Router } from 'express';
import { AuthenticateKeyHandler } from '../middleware';
import { Countries, users } from '../../shared/constants';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { BadRequestError } from '../../shared/errors';
import { ErrorCode } from '../../shared/enums';
import { genAPIKey } from '../../shared/utils';
import { ApiKeyController } from '../../controllers/api-key.controller';
const route: Router = Router();

// Export '/api-key' version of current API, with all sub request
export function apiKeyRoutes(app: Router): void {
  app.use('/api-key', route);

  route.post('/register', ApiKeyController.register);

  route.get('/country', AuthenticateKeyHandler, ApiKeyController.getCountry);


  route.post('/country', AuthenticateKeyHandler, ApiKeyController.registerCountry);
}