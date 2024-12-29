import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotBannedWord } from '../../../common/decorators/is-not-banned-word.decorator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  @IsNotBannedWord()
  @ApiProperty({ example: 'hollyj' })
  username: string;

  @Column({ unique: true })
  @IsString()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @ApiProperty({ example: 'holly.jennings@example.com' }) // Swagger
  email: string;

  @Column()
  @IsString()
  @MinLength(6, {
    message: 'Minimum character length should be at least 6 characters',
  })
  @IsStrongPassword({}, { message: 'Please enter more strong password' })
  @ApiProperty({ example: 'GoodGirl51.' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
