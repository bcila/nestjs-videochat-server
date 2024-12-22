import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  // accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  accessExpiresIn: '10s',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
}));

export interface JwtConfig {
  accessSecret: string;
  refreshSecret: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
}
