import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Check if NODE_ENV is set, throw an error if not
if (!process.env.NODE_ENV) {
  throw new Error(
    "⚠️  NODE_ENV is not set! Please set NODE_ENV to 'development' or 'production' ⚠️",
  );
}

// Determine the environment and load the corresponding .env file
const envFile = `.env.${process.env.NODE_ENV}`;
const envFilePath = path.resolve(process.cwd(), envFile);

Logger.log(
  `WE ARE ON ${process.env.NODE_ENV === 'production' ? '🔥🔥 PRODUCTION 🔥🔥' : '🚧🚧 DEVELOPMENT 🚧🚧'}`,
  'Environment',
);
Logger.log(`Environment file path: ${envFilePath}`, 'Environment');

if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
  Logger.log(`Loaded environment variables from ${envFile}`, 'Environment');
} else {
  throw new Error(`⚠️  Couldn't find ${envFile} file  ⚠️`);
}

Logger.log(`✌️ environment file loaded! ✅`, 'Environment');

// List of required environment variables
const requiredEnvVars = ['DATABASE_URL', 'PORT', 'NODE_ENV'];

// check if ENABLE_REDIS === 'true' and add redis variables to requiredEnvVars
if (process.env.ENABLE_REDIS === 'true') {
  requiredEnvVars.push(
    'REDIS_HOST',
    'REDIS_PORT',
    'REDIS_USER',
    'REDIS_PASSWORD',
  );
} else {
  Logger.log('⚠️  ENABLE_REDIS not set! Defaulting to false ⚠️', 'Environment');
}

// Add additional required variables for production environment
if (process.env.NODE_ENV === 'production') {
  requiredEnvVars.push(
    'REDIS_HOST',
    'REDIS_PORT',
    'REDIS_USER',
    'REDIS_PASSWORD',
  );
}

// Check if all required environment variables are present
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`⚠️  Missing required environment variable: ${envVar} ⚠️`);
  }
  Logger.log(`✅ required ENV: ${envVar} found!`, 'Environment');
});

Logger.log('✌️ all required environment variables found! ✅', 'Environment');

// Export the configuration
export default {
  /**
   * The port the application will run on
   * @type {number}
   * @default 3005
   * @example 3005
   */
  port: parseInt(process.env.PORT || '3005', 10),
  /**
   * The environment the application is running in
   * @type {string}
   * @default 'development'
   * @example 'development'
   */
  nodeEnv: process.env.NODE_ENV || 'development',
  /**
   * The URL of the application
   * @type {string}
   * @default 'http://localhost:3005'
   * @example 'http://localhost:3005'
   */
  appUrl:
    process.env.NODE_ENV === 'production'
      ? process.env.APP_URL
      : `http://localhost:${parseInt(process.env.PORT, 10)}`,
  /**
   * The URL of the database
   * @type {string}
   * @default 'postgresql://user:password@localhost:5432/public'
   * @example 'postgresql://user:password@localhost:5432/public'
   */
  databaseURL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/public',
  /**
   * The host of the Redis server
   * @type {string}
   * @default 'localhost'
   * @example 'localhost'
   */

  /**
   * Enable Redis caching
   * @type {boolean}
   * @default false
   * @example true
   */
  enableRedis: process.env.ENABLE_REDIS
    ? process.env.ENABLE_REDIS === 'true'
    : false,

  redisHost:
    process.env.NODE_ENV === 'production'
      ? process.env.REDIS_HOST
      : 'localhost',
  /**
   * The port of the Redis server
   * @type {string}
   * @default '6379'
   * @example '6379'
   */
  redisPort:
    process.env.NODE_ENV === 'production' ? process.env.REDIS_PORT : '6379',
  /**
   * The password for the Redis server
   * @type {string | undefined}
   * @default undefined
   * @example 'myredispassword'
   */
  redisPassword:
    process.env.NODE_ENV === 'production'
      ? process.env.REDIS_PASSWORD
      : undefined,
  /**
   * The user for the Redis server
   * @type {string | undefined}
   * @default undefined
   * @example 'myredisuser'
   */
  redisUser:
    process.env.NODE_ENV === 'production' ? process.env.REDIS_USER : undefined,
  /**
   * The secret key for JWT
   * @type {string}
   * @default 'SUPER-COMPLICATED-SECRET-HERE-232093JDA0'
   * @example 'myjwtsecret'
   */
  jwtSecret:
    process.env.NODE_ENV === 'production'
      ? process.env.JWT_SECRET
      : `SUPER-COMPLICATED-SECRET-HERE-232093JDA0`,
  /**
   * The expiration time for JWT
   * @type {string}
   * @example '1h'
   */
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  /**
   * The secret key for JWT magic link
   * @type {string}
   * @example 'mymagiclinksecret'
   */
  jwtMagicLinkSecret: process.env.JWT_MAGIC_LINK_SECRET,
};
