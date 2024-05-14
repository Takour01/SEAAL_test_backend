import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsYear' })
export class IsYear implements ValidatorConstraintInterface {
  validate(value: string, validationArguments: ValidationArguments): boolean {
    const regex = /^\d{4}$/; // Matches YYYY format
    return regex.test(value) && parseInt(value, 10) >= 2024; // Check year format and minimum value
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return 'Invalid year format (YYYY) or year must be greater than or equal to 2024.';
  }
}