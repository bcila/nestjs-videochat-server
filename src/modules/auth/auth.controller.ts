import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    // return req.user;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
