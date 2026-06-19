import { PrismaClient, PlanType, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const plans = [
    {
      name: 'Gratuito',
      type: PlanType.FREE,
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
      type: PlanType.ESSENTIAL,
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
      type: PlanType.PROFESSIONAL,
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
      type: PlanType.OFFICE,
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
        role: Role.ADMIN,
      },
    });

    console.log('Usuário administrador criado com sucesso!');
  } else {
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
