import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export const config = {
  port: process.env.PORT,
  database: {
    uri: process.env.MONGODB_URI,
    port: process.env.MONGODB_PORT,
    name: process.env.MONGODB_DATABASE_NAME,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
  cache: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
