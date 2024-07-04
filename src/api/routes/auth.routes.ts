import { Router } from 'express';
import AuthController from '../../controllers/auth.controller';
import { LoginRequest } from '../../models/auth';
import { ValidationLocation } from '../../shared/enums';
import { AuthenticationHandler, UsesDatabaseHandler, ValidationHandler } from '../middleware';
import PingController from '../../controllers/auth.controller';

const route: Router = Router();


// Export '/auth' version of current API, with all sub request
export function authRoutes(app: Router): void {
  app.use('/auth', route);
  
  const authController = new AuthController();

  // Validate credentials of user
  /*
  * @swagger
* /api/resource:
* get:
* summary: Get a resource
* description: Get a specific resource by ID.
* parameters:
* — in: path
* name: id
* required: true
* description: ID of the resource to retrieve.
* schema:
* type: string
* responses:
* 200:
* description: Successful response
*/
  route.post(
    '/login',
    //UsesDatabaseHandler,
    //ValidationHandler([{ schema: LoginRequest, location: ValidationLocation.BODY }]),
    async (_req, res) => {
      const controller = new PingController();
      const response = await controller.getMessage();
      return res.send(response);
    }
    //authController.login,
  );

  /*
  // Return data of current token
  route.get(
    '/me',
    UsesDatabaseHandler,
    AuthenticationHandler,
    authController.me,
  );
  */
};
