import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { ValidationLocation, ErrorCode } from '../../shared/enums';
import { BadRequestError } from '../../shared/errors';

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
  return (req: Request, res: Response, next: any) => {
    const { i18n } = res.locals;

    if (!schemaArray.length) {
      throw new BadRequestError({ message: i18n.__('general.errors.no-schema'), context: [i18n.__('general.errors.no-schema')], code: ErrorCode.INVALID_REQUEST });
    }

    for (const element of schemaArray) {
      const { schema, location }: ValidateProps = element;
      const { error, value } = schema.validate(req[location], validationOptions);

      // If there is an error, return it as response
      if (error) {
        const details: string[] = error.details.map(({ message }: ValidationError) => (message.replace(/['"]/g, '')));
        throw new BadRequestError({ message: i18n.__('general.errors.invalid-data'), context: details, code: ErrorCode.INVALID_REQUEST });
      }
      // Validation successful, return data to it's location
      req[location] = value;
    }

    return next();
  };
};
