import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { bannedWords } from '../constants/banner-words';

@ValidatorConstraint({ name: 'isNotBannedWord', async: false })
export class IsNotBannedWordConstraint implements ValidatorConstraintInterface {
  validate(username: string, args: ValidationArguments): boolean {
    const lowerUsername = username.toLowerCase();

    return !bannedWords.some((word) => lowerUsername.includes(word));
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Username includes banned words.';
  }
}
