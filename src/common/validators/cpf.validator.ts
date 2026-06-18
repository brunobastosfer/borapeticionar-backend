import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function isValidCpf(value?: string | null) {
  const cpf = String(value ?? '').replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const digits = cpf.split('').map(Number);

  const firstCheck = calculateCpfDigit(digits.slice(0, 9));
  const secondCheck = calculateCpfDigit(digits.slice(0, 10));

  return firstCheck === digits[9] && secondCheck === digits[10];
}

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidCpf',
      target: object.constructor,
      propertyName,
      options: {
        message: 'CPF invalido',
        ...validationOptions,
      },
      validator: {
        validate(value: unknown) {
          return typeof value === 'string' && isValidCpf(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um CPF valido`;
        },
      },
    });
  };
}

function calculateCpfDigit(numbers: number[]) {
  const sum = numbers.reduce(
    (acc, digit, index) => acc + digit * (numbers.length + 1 - index),
    0,
  );
  const remainder = (sum * 10) % 11;
  return remainder === 10 ? 0 : remainder;
}
