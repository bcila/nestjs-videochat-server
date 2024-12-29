import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsNotBannedWordConstraint } from '../validators/is-not-banned-word.validator';

export function IsNotBannedWord(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotBannedWordConstraint,
    });
  };
}
