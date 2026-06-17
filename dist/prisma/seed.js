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
const client_js_1 = require("../generated/prisma/client.js");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcrypt = __importStar(require("bcrypt"));
const adapter = new adapter_pg_1.PrismaPg(process.env.DATABASE_URL);
const prisma = new client_js_1.PrismaClient({ adapter });
async function main() {
    const plans = [
        {
            name: 'Gratuito',
            type: client_js_1.PlanType.FREE,
            price: 0,
            monthlyLimit: 2,
            isAvailable: true,
            canExportPdf: false,
            canExportWord: false,
            practiceAreas: ['trabalhista'],
            hasDashboard: false,
            hasFullHistory: false,
            hasExpandedLibrary: false,
            isMultiUser: false,
            hasTeamManagement: false,
            hasPriority: false,
            hasCustomTemplates: false,
            hasRealTimePreview: true,
            hasBasicEditor: false,
            hasBasicExport: true,
            features: [
                '2 peças por mês',
                'Área trabalhista',
                'Pré-visualização em tempo real',
                'Exportação básica',
                'Teste da plataforma',
            ],
        },
        {
            name: 'Essencial',
            type: client_js_1.PlanType.ESSENTIAL,
            price: 49.9,
            monthlyLimit: 15,
            isAvailable: true,
            canExportPdf: true,
            canExportWord: true,
            practiceAreas: ['trabalhista'],
            hasDashboard: false,
            hasFullHistory: true,
            hasExpandedLibrary: false,
            isMultiUser: false,
            hasTeamManagement: false,
            hasPriority: false,
            hasCustomTemplates: false,
            hasRealTimePreview: true,
            hasBasicEditor: true,
            hasBasicExport: true,
            features: [
                '15 produções jurídicas mensais',
                'Área trabalhista completa',
                'Editor básico',
                'Exportação Word/PDF',
                'Modelos básicos',
                'Histórico de peças',
            ],
        },
        {
            name: 'Profissional',
            type: client_js_1.PlanType.PROFESSIONAL,
            price: 89.9,
            monthlyLimit: 50,
            isAvailable: false,
            canExportPdf: true,
            canExportWord: true,
            practiceAreas: ['trabalhista', 'civil', 'consumidor'],
            hasDashboard: true,
            hasFullHistory: true,
            hasExpandedLibrary: true,
            isMultiUser: false,
            hasTeamManagement: false,
            hasPriority: false,
            hasCustomTemplates: false,
            hasRealTimePreview: true,
            hasBasicEditor: true,
            hasBasicExport: true,
            features: [
                'Tudo do plano Essencial',
                '50 produções jurídicas mensais',
                'Mais áreas jurídicas',
                'Dashboard operacional',
                'Histórico completo',
                'Biblioteca expandida de modelos',
            ],
        },
        {
            name: 'Escritório',
            type: client_js_1.PlanType.OFFICE,
            price: 149.9,
            monthlyLimit: null,
            isAvailable: false,
            canExportPdf: true,
            canExportWord: true,
            practiceAreas: ['trabalhista', 'civil', 'consumidor', 'previdenciario'],
            hasDashboard: true,
            hasFullHistory: true,
            hasExpandedLibrary: true,
            isMultiUser: true,
            hasTeamManagement: true,
            hasPriority: true,
            hasCustomTemplates: true,
            hasRealTimePreview: true,
            hasBasicEditor: true,
            hasBasicExport: true,
            features: [
                'Tudo do plano Profissional',
                'Produções jurídicas ilimitadas',
                'Multiusuário',
                'Modelos personalizados do escritório',
                'Gestão de equipe',
                'Prioridade de processamento',
                'Modelos internos do escritório',
            ],
        },
    ];
    for (const plan of plans) {
        await prisma.plan.upsert({
            where: { type: plan.type },
            update: plan,
            create: plan,
        });
    }
    console.log('Planos criados com sucesso!');
    const adminEmail = 'administrador@borapeticionar.com';
    const adminPassword = 'Web@12345';
    const existingAdmin = await prisma.user.findUnique({
        where: { institutionalEmail: adminEmail },
    });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 12);
        await prisma.user.create({
            data: {
                firstName: 'Administrador',
                lastName: 'Sistema',
                cpf: '00000000000',
                institutionalEmail: adminEmail,
                password: hashedPassword,
                role: client_js_1.Role.ADMIN,
            },
        });
        console.log('Usuário administrador criado com sucesso!');
    }
    else {
        console.log('Usuário administrador já existe.');
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map