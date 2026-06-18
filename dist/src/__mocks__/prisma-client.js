"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sex = exports.PetitionStatus = exports.Role = exports.PlanType = exports.PrismaClient = void 0;
exports.PrismaClient = jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        updateMany: jest.fn(),
    },
    plan: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        upsert: jest.fn(),
    },
    petition: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
    favorite: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
    },
    refreshToken: {
        create: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
    },
    passwordResetToken: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
    },
    petitionUsage: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
    },
    session: {
        create: jest.fn(),
        findFirst: jest.fn(),
        updateMany: jest.fn(),
    },
    organization: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
    organizationMember: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
    },
    petitionTemplate: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));
exports.PlanType = {
    FREE: 'FREE',
    ESSENTIAL: 'ESSENTIAL',
    PROFESSIONAL: 'PROFESSIONAL',
    OFFICE: 'OFFICE',
};
exports.Role = {
    USER: 'USER',
    COMPANY: 'COMPANY',
    ADMIN: 'ADMIN',
};
exports.PetitionStatus = {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    ARCHIVED: 'ARCHIVED',
};
exports.Sex = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
};
//# sourceMappingURL=prisma-client.js.map