"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCpf = isValidCpf;
exports.IsValidCpf = IsValidCpf;
const class_validator_1 = require("class-validator");
function isValidCpf(value) {
    const cpf = String(value ?? '').replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    const digits = cpf.split('').map(Number);
    const firstCheck = calculateCpfDigit(digits.slice(0, 9));
    const secondCheck = calculateCpfDigit(digits.slice(0, 10));
    return firstCheck === digits[9] && secondCheck === digits[10];
}
function IsValidCpf(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidCpf',
            target: object.constructor,
            propertyName,
            options: {
                message: 'CPF invalido',
                ...validationOptions,
            },
            validator: {
                validate(value) {
                    return typeof value === 'string' && isValidCpf(value);
                },
                defaultMessage(args) {
                    return `${args.property} deve ser um CPF valido`;
                },
            },
        });
    };
}
function calculateCpfDigit(numbers) {
    const sum = numbers.reduce((acc, digit, index) => acc + digit * (numbers.length + 1 - index), 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
}
//# sourceMappingURL=cpf.validator.js.map