import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  type: 'mongo',
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  host: process.env.MONGO_HOST,
  appName: process.env.MONGO_APPNAME,
  uri: `mongodb+srv://<mongo_username>:<mongo_password>@<mongo_host>/?retryWrites=true&w=majority&appName=<mongo_appName>`,
}));
