import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

@Entity('users')
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @MinLength(3, {
    message: 'Minimum character length should be at least 3 characters',
  })
  @MaxLength(20, {
    message: 'Maximum character length should be at least 20 characters',
  })
  username: string;

  @Column()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @Column()
  @IsString()
  @MinLength(6, {
    message: 'Minimum character length should be at least 6 characters',
  })
  @IsStrongPassword({}, { message: 'Please enter more strong password' })
  password: string;

  @Column()
  createdAt: Date;
}
