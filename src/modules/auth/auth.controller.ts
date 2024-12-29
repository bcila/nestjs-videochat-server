import {
  Controller,
  Post,
  UseGuards,
  Body,
  Res,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiBody, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
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
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: OmitType(User, ['username']) })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authentication successfully',
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Refreshed successfully' })
  async refresh(
    @CurrentUser() user: User,
    @CurrentDevice() deviceInfo: DeviceInfo,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response, deviceInfo, true);
  }

  @Get('check')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Check successfully' })
  async check(@CurrentUser() user: User) {
    return this.authService.check(user);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register successfully',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Logout successfully' })
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(user.id, response);
  }
}
