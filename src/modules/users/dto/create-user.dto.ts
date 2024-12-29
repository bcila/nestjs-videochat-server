import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { IsNotBannedWord } from '../../../common/decorators/is-not-banned-word.decorator';

export class CreateUserDto {
  @Column({ unique: true })
  @IsString()
  @IsNotBannedWord()
  @ApiProperty({ example: 'hollyj' })
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'holly.jennings@example.com' }) // Swagger
  email: string;
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({ example: 'GoodGirl51.' })
  password: string;
}
