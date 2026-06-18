import { PetitionStatus } from '../../../generated/prisma/client.js';
export declare class UpdatePetitionDto {
    practiceArea?: string;
    font?: string;
    textColor?: string;
    fullName?: string;
    cpfCnpj?: string;
    rg?: string;
    maritalStatus?: string;
    cep?: string;
    street?: string;
    defendantCompany?: string;
    cnpj?: string;
    facts?: string;
    requests?: string;
    status?: PetitionStatus;
}
