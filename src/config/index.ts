import * as Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

// Validate, before running, that all the .env variables are set
export const validateEnv = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().positive().required(),
    PROJECT_NAME: Joi.string().description('API Template'),
    PREFIX: Joi.string().default('/api/v1').description('API Template'),
    USE_DATABASE: Joi.boolean().default(false).description('Decide if API has access to a DB'),
    DATABASE_HOST: Joi.string().description('Database host'),
    DATABASE_NAME: Joi.string().description('Database name'),
    DATABASE_USER: Joi.string().description('Database user'),
    DATABASE_PASSWORD: Joi.string().description('Database password'),
  })
  .unknown();

// Validate schema, if each variable has a valid value
const { value: envVars, error } = validateEnv.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Create an interface of what will APIConfig will have
export interface IConfig {
  api: {
    port: number;
    prefix: string;
  };
  database?: {
    useDatabase: boolean;
    host?: string;
    user?: string;
    password?: string;
    database?: string;
  }
}

// Return value of data that will be used in all the project
export const config: IConfig = {
  api: {
    port: envVars.PORT,
    prefix: envVars.PREFIX,
  },
  database: {
    useDatabase: envVars.USE_DATABASE,
    host: envVars.DATABASE_HOST,
    user: envVars.DATABASE_USER,
    password: envVars.DATABASE_PASSWORD,
    database: envVars.DATABASE_NAME,
  }
};
