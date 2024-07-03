import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { ApiErrorResponse } from '../../shared/interfaces/api-response.interface';
import { ValidationLocation } from '../../shared/enums';

interface ValidationError {
  message: string;
  type: string;
}

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

export interface ValidateProps {
  location: ValidationLocation;
  schema: Joi.ObjectSchema<any>;
}

// This middleware will do a validation of data sent to the API, that needs to match the default configuration per each EP
export const ValidationHandler = (schemaArray: ValidateProps[]): RequestHandler => {
  if (!schemaArray.length) {
    throw new Error('No schema was found');
  }

  return (req: Request, res: Response, next: any) => {
    for (const element of schemaArray) {
      const { schema, location }: ValidateProps = element;
      const { error, value } = schema.validate(req[location], validationOptions);

      // If there is an error, return it as response
      if (error) {
        const errorResponse: ApiErrorResponse = {
          error: 'failed',
          details: error.details.map(({ message }: ValidationError) => (message.replace(/['"]/g, ''))),
        };

        return res.status(400).json(errorResponse);
      }
      // Validation successful, return data to it's location
      req[location] = value;
    }
    
    return next();
  };
};
