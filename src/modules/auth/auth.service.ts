import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { TokenPayload } from './interfaces/token-payload.interface';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../config/jwt.config';
import { timeStringToMs } from '../../common/helpers/time.helper';
import DeviceInfo from '../../common/interfaces/device-info.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './schemas/session.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async login(user: User, response: Response, deviceInfo: DeviceInfo) {
    const jwtConfig: JwtConfig = this.configService.get<JwtConfig>('jwt');

    const payload: TokenPayload = { userId: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConfig.accessSecret,
      expiresIn: jwtConfig.accessExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConfig.refreshSecret,
      expiresIn: jwtConfig.refreshExpiresIn,
    });

    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getMilliseconds() +
        timeStringToMs(jwtConfig.accessExpiresIn),
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getMilliseconds() +
        timeStringToMs(jwtConfig.refreshExpiresIn),
    );

    response.cookie('Authorization', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      expires: expiresAccessToken,
    });

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      expires: expiresRefreshToken,
    });

    await this.sessionModel.findOneAndUpdate(
      { userId: user.id },
      {
        $set: {
          refreshToken: await hash(refreshToken, 10),
          deviceInfo: deviceInfo,
        },
      },
      { new: true, upsert: true },
    );
  }

  async verifyUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.findOne({ email });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }

  async verifyUserRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<User> {
    try {
      const user = await this.usersService.findOne({ id: userId });
      const response = await this.sessionModel.findOne({ userId: userId });
      const authenticated = await compare(refreshToken, response.refreshToken);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid.');
    }
  }

  async logout(userId: string, response: Response): Promise<void> {
    await this.sessionModel.findOneAndDelete({ userId: userId });
  }
}
