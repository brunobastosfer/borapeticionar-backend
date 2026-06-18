"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpfCnpjMaskPipe = void 0;
const common_1 = require("@nestjs/common");
let CpfCnpjMaskPipe = class CpfCnpjMaskPipe {
    transform(value) {
        if (typeof value === 'string') {
            return onlyDigits(value);
        }
        if (value && typeof value === 'object') {
            return normalizeFields(value, ['cpf', 'cpfCnpj', 'cnpj']);
        }
        return value;
    }
};
exports.CpfCnpjMaskPipe = CpfCnpjMaskPipe;
exports.CpfCnpjMaskPipe = CpfCnpjMaskPipe = __decorate([
    (0, common_1.Injectable)()
], CpfCnpjMaskPipe);
function normalizeFields(value, fields) {
    const normalized = { ...value };
    for (const field of fields) {
        if (typeof normalized[field] === 'string') {
            normalized[field] = onlyDigits(normalized[field]);
        }
    }
    return normalized;
}
function onlyDigits(value) {
    return String(value ?? '').replace(/\D/g, '');
}
//# sourceMappingURL=cpf-cnpj-mask.pipe.js.map