import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuyRecordDto } from './dtos/create-buy-record.dto';
import { BuyRecords } from './entity/buy-records.entity';
const uuid = require('uuid');
import { In } from "typeorm";
import { SearchBuyRecordsDto } from './dtos/search-buy-records.dto';

@Injectable()
export class BuyRecordsService {
    constructor(
        @InjectRepository(BuyRecords) private buyRecordRepository:Repository<BuyRecords>
    ){}
    
    async findAll(){
        return await this.buyRecordRepository.find({});
    }

    async findByUser(id){
        // return await createQueryBuilder("BuyRecords")
        // .leftJoinAndSelect(User, "user", "BuyRecords.userId = user.userId")
        // .where("user.userId=:userId",{userId:id})
        // .getMany();
        return await this.buyRecordRepository.find({
            where:{userId:id}
        })
    }


    async create(buyRecord:CreateBuyRecordDto){
        // const ID = uuid.v4();
        // buyRecord.orderId = ID.split('-')[0]+ID.split('-')[1]+ID.split('-')[2];
        console.log(buyRecord);
        const entity = await this.buyRecordRepository.create({userId:buyRecord.userId,goodsId:buyRecord.goodsId,buyDate:new Date(),buyPrice:buyRecord.buyPrice});
        await this.buyRecordRepository.save(entity);

        return {
            code:200,
            message:'插入成功'
        } ;
    }

    async remove(id:string){
        const goodsId = await this.buyRecordRepository.findOne({where:{orderId:id}});
        if(!goodsId){
            throw new NotFoundException('buyRecord not found');
        }
        await this.buyRecordRepository.remove(goodsId);
        return {
            code:200,
            message:"删除成功"
        }
    }

    async removeAll(){
        const buyRecord = await this.buyRecordRepository.find();
        if(!buyRecord){
            throw new NotFoundException('buyRecord not found');
        }
        buyRecord.forEach(async (item)=>{
            await this.buyRecordRepository.remove(item);
        })
        return {
            code:200,
            message:"删除成功"
        };
    }

    async deletePart(orderIds:Array<string>){
        orderIds.forEach((item)=>{
            this.remove(item);
        })
        return {
            code:200,
            message:'删除成功'
        }
    }


    async update(id:string,attrs:Partial<BuyRecords>){
        const buyRecord = await this.buyRecordRepository.findOne({where:{orderId:id}});
        if(!buyRecord){
            throw new NotFoundException('buyRecord not found');
        }
        Object.assign(buyRecord,attrs);
        await this.buyRecordRepository.save(buyRecord);
        return {
            code:200,
            message:"修改成功"
        };
    }

    findOne(id:string){
        if(!id){
            return null;
        }
        return this.buyRecordRepository.findOne({where:{orderId:id}});
    }

    async getGoodsInfoByIds(arr:Array<number>){
        return await this.buyRecordRepository.find({
            goodsId:In(arr)
        })
    }

    async getSearch(search:SearchBuyRecordsDto){
        const whereOptions = [];
        let options = {};

        console.log(search);

        search.orderId?whereOptions.push({label:'orderId',value:search.orderId}):'';
        
        for(let i=0;i<whereOptions.length;i++){
            options[whereOptions[i].label] = whereOptions[i].value;
        }

        return await this.buyRecordRepository.find({
            where:options
        });
    }

    async getFindOne(orderId:string){
        return await this.buyRecordRepository.findOne({where:{orderId}});
    }
}
