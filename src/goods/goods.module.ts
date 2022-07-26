import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyRecordsModule } from 'src/buy-records/buy-records.module';
import { BuyRecords } from 'src/buy-records/entity/buy-records.entity';
import { Goods } from './entity/goods.entity';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
    imports:[TypeOrmModule.forFeature([Goods]),BuyRecordsModule],
    controllers: [GoodsController],
    providers:[
        GoodsService,
        BuyRecords
    ],
    exports:[GoodsService]
})
export class GoodsModule {}
