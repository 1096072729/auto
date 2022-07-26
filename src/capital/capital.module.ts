import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapitalController } from './capital.controller';
import { CapitalService } from './capital.service';
import { Capital } from './entity/capital.entity';

@Module({
  providers: [CapitalService],
  imports:[TypeOrmModule.forFeature([Capital])],
  controllers: [CapitalController],
  exports:[CapitalService]
})
export class CapitalModule {}
