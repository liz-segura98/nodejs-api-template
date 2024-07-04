import { Router } from 'express';
import { userRoutes, authRoutes, apiKeyRoutes } from './routes';

// guaranteed to get dependencies
export default () => {
  const app: Router = Router();
  authRoutes(app);
  userRoutes(app);
  apiKeyRoutes(app);

  return app;
};
