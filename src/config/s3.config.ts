import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
  region: process.env.MINIO_REGION,
  endpoint: process.env.MINIO_ENDPOINT,
}));
