"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.SessionScalarFieldEnum = exports.PetitionTemplateScalarFieldEnum = exports.OrganizationMemberScalarFieldEnum = exports.OrganizationScalarFieldEnum = exports.PetitionUsageScalarFieldEnum = exports.PasswordResetTokenScalarFieldEnum = exports.RefreshTokenScalarFieldEnum = exports.FavoriteScalarFieldEnum = exports.PetitionScalarFieldEnum = exports.PlanScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Plan: 'Plan',
    Petition: 'Petition',
    Favorite: 'Favorite',
    RefreshToken: 'RefreshToken',
    PasswordResetToken: 'PasswordResetToken',
    PetitionUsage: 'PetitionUsage',
    Organization: 'Organization',
    OrganizationMember: 'OrganizationMember',
    PetitionTemplate: 'PetitionTemplate',
    Session: 'Session'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    cpf: 'cpf',
    oabNumber: 'oabNumber',
    sex: 'sex',
    practiceArea: 'practiceArea',
    institutionalEmail: 'institutionalEmail',
    password: 'password',
    role: 'role',
    planId: 'planId',
    organizationId: 'organizationId',
    linkedToId: 'linkedToId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PlanScalarFieldEnum = {
    id: 'id',
    name: 'name',
    type: 'type',
    price: 'price',
    monthlyLimit: 'monthlyLimit',
    isAvailable: 'isAvailable',
    canExportPdf: 'canExportPdf',
    canExportWord: 'canExportWord',
    practiceAreas: 'practiceAreas',
    hasDashboard: 'hasDashboard',
    hasFullHistory: 'hasFullHistory',
    hasExpandedLibrary: 'hasExpandedLibrary',
    isMultiUser: 'isMultiUser',
    hasTeamManagement: 'hasTeamManagement',
    hasPriority: 'hasPriority',
    hasCustomTemplates: 'hasCustomTemplates',
    hasRealTimePreview: 'hasRealTimePreview',
    hasBasicEditor: 'hasBasicEditor',
    hasBasicExport: 'hasBasicExport',
    features: 'features',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PetitionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    practiceArea: 'practiceArea',
    font: 'font',
    textColor: 'textColor',
    fullName: 'fullName',
    cpfCnpj: 'cpfCnpj',
    rg: 'rg',
    maritalStatus: 'maritalStatus',
    cep: 'cep',
    street: 'street',
    defendantCompany: 'defendantCompany',
    cnpj: 'cnpj',
    facts: 'facts',
    requests: 'requests',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FavoriteScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    petitionId: 'petitionId',
    createdAt: 'createdAt'
};
exports.RefreshTokenScalarFieldEnum = {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
};
exports.PasswordResetTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
exports.PetitionUsageScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    year: 'year',
    month: 'month',
    count: 'count'
};
exports.OrganizationScalarFieldEnum = {
    id: 'id',
    name: 'name',
    cnpj: 'cnpj',
    ownerId: 'ownerId',
    planId: 'planId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrganizationMemberScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    userId: 'userId',
    role: 'role',
    joinedAt: 'joinedAt'
};
exports.PetitionTemplateScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    content: 'content',
    category: 'category',
    planId: 'planId',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    isActive: 'isActive',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map