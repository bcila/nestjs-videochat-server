import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => ({
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '1h',
}))

export interface JwtConfig {
    accessSecret: string;
    refreshSecret: string;
    expiresIn: string;
}