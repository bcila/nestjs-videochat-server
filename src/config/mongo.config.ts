import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  url: process.env.NODE_ENV
    ? process.env.POSTGRES_URL_INTERNAL
    : process.env.POSTGRES_URL_PUBLIC,
}));
