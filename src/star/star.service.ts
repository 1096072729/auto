import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateStarDto } from './dtos/create-star.dto';
import { Star } from './entitys/star.entity';

@Injectable()
export class StarService {
    constructor(@InjectRepository(Star) private starRepository:Repository<Star>){}

    async create(Star:CreateStarDto){
        // const ID = uuid.v4();
        // Star.starId = ID.split('-')[0]+ID.split('-')[1]+ID.split('-')[2];
        console.log(Star);
        const entity = await this.starRepository.create(
            {userId:Star.userId,goodsId:Star.goodsId,starDate:new Date(),starPrice:Star.starPrice});
        await this.starRepository.save(entity);

        return {
            code:200,
            message:'插入成功'
        } ;
    }

    async findAll(){
        return await this.starRepository.find({});
    }

    async findByUser(id){
        // return await createQueryBuilder("stars")
        // .leftJoinAndSelect(User, "user", "stars.userId = user.userId")
        // .where("user.userId=:userId",{userId:id})
        // .getMany();
        return await this.starRepository.find({
            where:{userId:id}
        })
    }

    async deleteByUser(id){
      (await this.findByUser(id)).forEach(async (date)=>{
        await this.starRepository.remove(date);
      })
      return{
        code:200,
        message:"删除成功"
    }
       
    }


 

    async remove(id:string){
        const goodsId = await this.starRepository.findOne({where:{starId:id}});
        if(!goodsId){
            throw new NotFoundException('star not found');
        }
        await this.starRepository.remove(goodsId);
        return {
            code:200,
            message:"删除成功"
        }
    }

    async removeAll(){
        const star = await this.starRepository.find();
        if(!star){
            throw new NotFoundException('star not found');
        }
        star.forEach(async (item)=>{
            await this.starRepository.remove(item);
        })
        return {
            code:200,
            message:"删除成功"
        };
    }

    async update(id:string,attrs:Partial<Star>){
        const star = await this.starRepository.findOne({where:{orderId:id}});
        if(!star){
            throw new NotFoundException('star not found');
        }
        Object.assign(star,attrs);
        await this.starRepository.save(star);
        return {
            code:200,
            message:"修改成功"
        };
    }

    findOne(id:string){
        if(!id){
            return null;
        }
        return this.starRepository.findOne({where:{orderId:id}});
    }
}
