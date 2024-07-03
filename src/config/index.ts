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
    DATABASE_SQLITE_PATH: Joi.string().description('Database path for SQLite'),
    JWT_SECRET: Joi.string().required().description('JWT Secret password to do hashing'),
    JWT_EXPIRES_IN: Joi.string().required().description('JWT to expire in any time'),
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
  jwt: {
    secret: string;
    expiresIn: string;
  };
  database: {
    useDatabase: boolean;
    sqlitePath?: string;
  }
}

// Return value of data that will be used in all the project
export const config: IConfig = {
  api: {
    port: envVars.PORT,
    prefix: envVars.PREFIX,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
  database: {
    useDatabase: envVars.USE_DATABASE,
    sqlitePath: envVars.DATABASE_SQLITE_PATH,
  },
};