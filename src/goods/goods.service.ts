import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository, Timestamp } from 'typeorm';
import { CreateGoodsDto } from './dtos/create-goods.dto';
import { SearchGoodsDto } from './dtos/search-goods.dto';
import { UpdateGoodsDto } from './dtos/update-goods.dto';
import { Goods } from './entity/goods.entity';
const { v4: uuidv4 } = require('uuid');
import { Like } from "typeorm";
import { SearchValueDto } from './dtos/search-value-dto';
import { BuyRecordsService } from 'src/buy-records/buy-records.service';

@Injectable()
export class GoodsService {

    constructor(
        @InjectRepository(Goods) private goodsRepository:Repository<Goods>,
        private buyRecordsService:BuyRecordsService
    ){}
    
    async findAll(){
        return await this.goodsRepository.find({where:{isDelete:false}});
    }

    async findBySecret(secret:string){
        return await this.goodsRepository.find({where:{skipLinkSecret:secret}});
    }

    async createGoods(goods:CreateGoodsDto){
        let tempGoods:any = goods;
        tempGoods.skipLinkSecret = uuidv4();  //生成链接跳转码
        const entity = await this.goodsRepository.create(goods);
        await this.goodsRepository.save(entity);
        return {
            code:200,
            message:'插入成功'
        };
    }

    async remove(id:number){
        const goods = await this.goodsRepository.findOne({where:{goodsId:id}});
        if(!goods){
            throw new NotFoundException('goods not found');
        }
        // await this.goodsRepository.remove(goodsId);
        goods.isDelete = true;
        await this.goodsRepository.save(goods);
        return {
            code:200,
            message:"删除成功"
        }
    }

    async removeAll(){
        const goods = await this.goodsRepository.find();
        if(!goods){
            throw new NotFoundException('goods not found');
        }
        goods.forEach(async (item)=>{
            // await this.goodsRepository.remove(item);
            item.isDelete = true;
            await this.goodsRepository.save(item);
        })
        return {
            code:200,
            message:"删除成功"
        };
    }

    async updateGoods(id:number,attrs:Partial<Goods>){
        const goods = await this.goodsRepository.findOne({where:{goodsId:id}});
        if(!goods){
            throw new NotFoundException('goods not found');
        }
        
        const date = new Date(); 
        attrs.modifyDate = date;
        Object.assign(goods,attrs);
        await this.goodsRepository.save(goods);
        return {
            code:200,
            message:"修改成功"
        };
    }

    async findOne(id:number){
        if(!id){
            return null;
        }
        return await this.goodsRepository.findOne({where:{goodsId:id,isDelete:false}});
    }

    async getSearch(search:SearchGoodsDto){
        const whereOptions = [];
        let options = {};

        console.log(search);

        search.goodsId?whereOptions.push({label:'goodsId',value:search.goodsId}):'';
        search.goodsTitle?whereOptions.push({label:'goodsTitle',value:search.goodsTitle}):'';
        search.category?whereOptions.push({label:'category',value:search.category}):'';
        search.originalPrice?whereOptions.push({label:'originalPrice',value:search.originalPrice}):'';
        search.currentPrice?whereOptions.push({label:'currentPrice',value:search.currentPrice}):'';

        for(let i=0;i<whereOptions.length;i++){
            options[whereOptions[i].label] = whereOptions[i].value;
        }

        console.log(options);

        return await this.goodsRepository.find({
            where:options
        });
    }

    async getSearchOfPage(page:number,data:SearchValueDto){
        const total =  await this.goodsRepository.find({
            where:[
                {goodsTitle: Like(`%${data.searchValue}%`),isDelete:false},
                {goodsDes:Like(`%${data.searchValue}%`),isDelete:false},
                {comment:Like(`%${data.searchValue}%`),isDelete:false},
                {category:Like(`%${data.searchValue}%`),isDelete:false},
                {residue:Like(`%${data.searchValue}%`),isDelete:false},
                {originalPrice:Like(`%${data.searchValue}%`),isDelete:false},
                {currentPrice:Like(`%${data.searchValue}%`),isDelete:false}
            ]
        })
        const arr = await this.goodsRepository.find({
            where:[
                {goodsTitle: Like(`%${data.searchValue}%`),isDelete:false},
                {goodsDes:Like(`%${data.searchValue}%`),isDelete:false},
                {comment:Like(`%${data.searchValue}%`),isDelete:false},
                {category:Like(`%${data.searchValue}%`),isDelete:false},
                {residue:Like(`%${data.searchValue}%`),isDelete:false},
                {originalPrice:Like(`%${data.searchValue}%`),isDelete:false},
                {currentPrice:Like(`%${data.searchValue}%`),isDelete:false}
            ],
            skip:page,
            take:15
        })
        let obj:any = {
            total:total.length,
            data:arr
        }
        return obj;

    }

    async getGoodsById(account:string){
        return await this.goodsRepository.find({
            where:{userAccount:account}
        })
    }

    async getOrderGoods(orderId:string){
        const order =await this.buyRecordsService.getFindOne(orderId);
        let forder:any = order;
        const goodsInfo = await this.goodsRepository.findOne({where:{goodsId:order.goodsId}});
        forder.goods = goodsInfo;
        return forder;
    }

    async getByUserAccount(userAccount:string){

        const goodsInfo =  await this.goodsRepository.find({where:{userAccount}});
        let goodsInArr = [];
        for(let i=0;i<goodsInfo.length;i++){
            goodsInArr.push(goodsInfo[i].goodsId);
        }
        // const result = await this.buyRecordsService.getGoodsInfoByIds(goodsInArr);
        const buyRecords:any = await this.buyRecordsService.findAll();
        let result = [];
        for(let i=0;i<buyRecords.length;i++){
            if(this.isExsit(buyRecords[i].goodsId,goodsInArr)){
                buyRecords[i].goods = this.getGoodsData(buyRecords[i].goodsId,goodsInArr,goodsInfo);
                result.push(buyRecords[i]);
            }
        }
        return result;
    }

    async getAllWithGoods(){
        const goodsInfo =  await this.goodsRepository.find({});
        let goodsInfoArr:any = {};
        for(let i=0;i<goodsInfo.length;i++){
            goodsInfoArr[goodsInfo[i].goodsId] = goodsInfo[i];
        }
        const buyRecords:any = await this.buyRecordsService.findAll();
        let result = [];
        for(let i=0;i<buyRecords.length;i++){
            if(goodsInfoArr[buyRecords[i].goodsId]){
                buyRecords[i].goods = goodsInfoArr[buyRecords[i].goodsId];
                result.push(buyRecords[i]);
            }
            
        }
        return result;

    }

    isExsit(num:number,arr:Array<number>){
        for(let i=0;i<arr.length;i++){
            if(num == arr[i])return true;
        }
        return false;
    }

    getGoodsData(num:number,arr:Array<number>,goodsInfo:Array<Object>){
        for(let i=0;i<arr.length;i++){
            if(num == arr[i]){
                return goodsInfo[i];
            }
        }
        return {};
    }


    async deletePart(goodsIds:Array<number>){
        goodsIds.forEach((item)=>{
            this.remove(item);
        })
        return {
            code:200,
            message:'删除成功'
        }
    }

}
