import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsModule } from 'src/goods/goods.module';
import { GoodsService } from 'src/goods/goods.service';
import { BuyRecordsController } from './buy-records.controller';
import { BuyRecordsService } from './buy-records.service';
import { BuyRecords } from './entity/buy-records.entity';

@Module({
    imports:[TypeOrmModule.forFeature([BuyRecords])],
    controllers: [BuyRecordsController],
    providers:[
        BuyRecordsService,
        
    ],
    exports:[BuyRecordsService]
})
export class BuyRecordsModule {}
