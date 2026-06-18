import { Sex } from '../../../generated/prisma/client.js';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    cpf: string;
    oabNumber?: string;
    sex?: Sex;
    practiceArea?: string;
    institutionalEmail: string;
    password: string;
}
