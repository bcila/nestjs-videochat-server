import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'holly.jennings@example.com' }) // Swagger
  email: string;
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({ example: 'GoodGirl51.' })
  password: string;
}
