import { Controller, Post, UseGuards, Body, Res } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentDevice } from '../../common/decorators/current-device.decorator';
import DeviceInfo from '../../common/interfaces/device-info.interface';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: User })
  async login(
    @CurrentUser() user: User,
    @CurrentDevice() deviceInfo: DeviceInfo,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response, deviceInfo);
  }

  @Public()
  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiBody({ type: User })
  async refresh(
    @CurrentUser() user: User,
    @CurrentDevice() deviceInfo: DeviceInfo,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response, deviceInfo);
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('logout')
  async logout(@CurrentUser() user: User, @Res() response: Response) {
    await this.authService.logout(user.id, response);
  }
}
