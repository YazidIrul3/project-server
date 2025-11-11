import dotenv from "dotenv";

dotenv.config();

const config = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  API_KEY: process.env.API_KEY,
  FRONT_END_URL: process.env.FRONT_END_URL,
  BACKEND_URL: process.env.BACKEND_URL,
  PORT: process.env.PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_AUTH_URL: process.env.REDIRECT_AUTH_URL,
};

export default config;
