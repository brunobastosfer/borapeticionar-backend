import { Sex } from '../../../generated/prisma/client.js';
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    oabNumber?: string;
    sex?: Sex;
    practiceArea?: string;
    institutionalEmail?: string;
    password?: string;
}
