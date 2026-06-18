import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function isValidCnpj(value?: string | null) {
  const cnpj = String(value ?? '').replace(/\D/g, '');

  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  const digits = cnpj.split('').map(Number);
  const firstCheck = calculateCnpjDigit(
    digits.slice(0, 12),
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );
  const secondCheck = calculateCnpjDigit(
    digits.slice(0, 13),
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );

  return firstCheck === digits[12] && secondCheck === digits[13];
}

export function IsValidCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidCnpj',
      target: object.constructor,
      propertyName,
      options: {
        message: 'CNPJ invalido',
        ...validationOptions,
      },
      validator: {
        validate(value: unknown) {
          return typeof value === 'string' && isValidCnpj(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um CNPJ valido`;
        },
      },
    });
  };
}

function calculateCnpjDigit(numbers: number[], weights: number[]) {
  const sum = numbers.reduce(
    (acc, digit, index) => acc + digit * weights[index],
    0,
  );
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}
