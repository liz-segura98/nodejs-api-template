import * as Joi from 'joi';
require('dotenv').config({ path: process.env.DOTENV });

// Validate, before running, that all the .env variables are set
export const validateEnv = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().positive().required(),
    PROJECT_NAME: Joi.string().default('API Template').description('API Template'),
    PREFIX: Joi.string().default('/api/v1').description('API prefix to each request'),
    USE_DATABASE: Joi.boolean().default(false).description('Decide if API has access to a DB'),
    DATABASE_SQLITE_PATH: Joi.string().description('Database path for SQLite'),
    JWT_SECRET: Joi.string().required().description('JWT Secret password to do hashing'),
    JWT_EXPIRES_IN: Joi.string().required().description('JWT to expire in any time'),
    ALLOWED_ORIGINS: Joi.string().default(['*']).description('Which are the valid origins that could access the API'),
    ENCRYPT_SECRET_KEY: Joi.string().default('').description('HASHING - Secret key to do hash of data'),
    ENCRYPT_SECRET_IV: Joi.string().default('').description('HASHING - Secret IV to do hash of data'),
    SMTP_HOST: Joi.string().default('').description('EMAIL - Owner of account emails'),
    SMTP_EMAIL: Joi.string().default('').description('EMAIL - Account who will send emails'),
    SMTP_PASSWORD: Joi.string().default('').description('EMAIL - Account who will send emails'),
    SMTP_PORT: Joi.string().default(25).description('EMAIL - Port where the data is deployed'),
    SMTP_EMAIL_NOTIFICATION: Joi.string().default('').description('EMAIL - Account who will send emails'),
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
    allowedOrigins: string[];
  };
  encrypt: {
    secretKey: string;
    secretIv: string;
  },
  jwt: {
    secret: string;
    expiresIn: string;
  };
  database: {
    useDatabase: boolean;
    sqlitePath?: string;
  };
  smtp: {
    host: string;
    port: number;
    email: string;
    emailTo: string;
    password: string;
  }
}

// Return value of data that will be used in all the project
export const config: IConfig = {
  api: {
    port: envVars.PORT,
    prefix: envVars.PREFIX,
    allowedOrigins: envVars.ALLOWED_ORIGINS.split(','),
  },
  encrypt: {
    secretKey: envVars.ENCRYPT_SECRET_KEY,
    secretIv: envVars.ENCRYPT_SECRET_IV,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
  database: {
    useDatabase: envVars.USE_DATABASE,
    sqlitePath: envVars.DATABASE_SQLITE_PATH,
  },
  smtp: {
    host: envVars.SMTP_HOST,
    email: envVars.SMTP_EMAIL,
    password: envVars.SMTP_PASSWORD,
    port: envVars.SMTP_PORT,
    emailTo: envVars.SMTP_EMAIL_NOTIFICATION,
  }
};