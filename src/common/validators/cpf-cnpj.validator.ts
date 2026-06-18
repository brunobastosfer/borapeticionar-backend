import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isValidCnpj } from './cnpj.validator';
import { isValidCpf } from './cpf.validator';

export function isValidCpfCnpj(value?: string | null) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (digits.length === 11) return isValidCpf(digits);
  if (digits.length === 14) return isValidCnpj(digits);
  return false;
}

export function IsValidCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidCpfCnpj',
      target: object.constructor,
      propertyName,
      options: {
        message: 'CPF/CNPJ invalido',
        ...validationOptions,
      },
      validator: {
        validate(value: unknown) {
          return typeof value === 'string' && isValidCpfCnpj(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um CPF ou CNPJ valido`;
        },
      },
    });
  };
}
