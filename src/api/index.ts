import { Router } from 'express';
import { userRoutes, authRoutes } from './routes';

// guaranteed to get dependencies
export default () => {
  const app: Router = Router();
  authRoutes(app);
  //userRoutes(app);

  return app;
};
