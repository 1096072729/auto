import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Star } from './entitys/star.entity';
import { StarController } from './star.controller';
import { StarService } from './star.service';

@Module({
  imports:[TypeOrmModule.forFeature([Star])],
    controllers: [StarController],
    providers:[
      StarService
    ],
    exports:[StarService]
})
export class StarModule {}
