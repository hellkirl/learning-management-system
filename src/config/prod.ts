import * as process from 'node:process';

const jwtSecret = process.env.JWT_SECRET;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

export default {
  jwtSecret,
  dbHost,
  dbName,
  dbUser,
  dbPassword,
};
