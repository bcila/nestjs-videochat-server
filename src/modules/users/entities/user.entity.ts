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

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @Column()
  @IsString()
  @MinLength(6, {
    message: 'Minimum character length should be at least 6 characters',
  })
  @IsStrongPassword({}, { message: 'Please enter more strong password' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
