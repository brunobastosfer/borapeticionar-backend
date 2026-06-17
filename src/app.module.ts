import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PetitionsModule } from './petitions/petitions.module';
import { PlansModule } from './plans/plans.module';
import { TemplatesModule } from './templates/templates.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PetitionsModule,
    PlansModule,
    TemplatesModule,
    OrganizationsModule,
  ],
})
export class AppModule {}
