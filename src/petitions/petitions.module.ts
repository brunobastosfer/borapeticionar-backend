import { Module } from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { PetitionsController } from './petitions.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PetitionsController],
  providers: [PetitionsService],
  exports: [PetitionsService],
})
export class PetitionsModule {}
