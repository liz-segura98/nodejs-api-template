import { Router } from 'express';
import auth from './routes/auth.routes';

// guaranteed to get dependencies
export default () => {
  const app: Router = Router();
  auth(app);

  return app;
};
