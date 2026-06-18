"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCpfCnpj = isValidCpfCnpj;
exports.IsValidCpfCnpj = IsValidCpfCnpj;
const class_validator_1 = require("class-validator");
const cnpj_validator_1 = require("./cnpj.validator");
const cpf_validator_1 = require("./cpf.validator");
function isValidCpfCnpj(value) {
    const digits = String(value ?? '').replace(/\D/g, '');
    if (digits.length === 11)
        return (0, cpf_validator_1.isValidCpf)(digits);
    if (digits.length === 14)
        return (0, cnpj_validator_1.isValidCnpj)(digits);
    return false;
}
function IsValidCpfCnpj(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidCpfCnpj',
            target: object.constructor,
            propertyName,
            options: {
                message: 'CPF/CNPJ invalido',
                ...validationOptions,
            },
            validator: {
                validate(value) {
                    return typeof value === 'string' && isValidCpfCnpj(value);
                },
                defaultMessage(args) {
                    return `${args.property} deve ser um CPF ou CNPJ valido`;
                },
            },
        });
    };
}
//# sourceMappingURL=cpf-cnpj.validator.js.map