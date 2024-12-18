import { ConfigService } from "@nestjs/config"
import { JwtConfig } from "src/config/jwt.config"

export const getJwtConfig = (configService: ConfigService) => {
    const jwtConfig = configService.get<JwtConfig>('jwt')
    return {
        secret: jwtConfig.accessSecret,
        signOptions: { expiresIn: jwtConfig.expiresIn },
    }
}