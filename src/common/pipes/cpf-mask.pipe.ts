import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CpfMaskPipe implements PipeTransform {
  transform(value: unknown) {
    if (typeof value === 'string') {
      return onlyDigits(value);
    }

    if (value && typeof value === 'object') {
      return normalizeFields(value, ['cpf']);
    }

    return value;
  }
}

function normalizeFields<T extends object>(value: T, fields: string[]) {
  const normalized = { ...value } as Record<string, unknown>;

  for (const field of fields) {
    if (typeof normalized[field] === 'string') {
      normalized[field] = onlyDigits(normalized[field]);
    }
  }

  return normalized;
}

function onlyDigits(value: unknown) {
  return String(value ?? '').replace(/\D/g, '');
}
