import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  type: 'mongo',
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  host: process.env.MONGO_HOST,
  appName: process.env.MONGO_APPNAME,
  uri: process.env.MONGO_URI,
}));
