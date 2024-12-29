import { Body, Controller, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('location')
  async location(@Body() lon, @Body() lan) {
    console.log(lon, lan);
  }
}
