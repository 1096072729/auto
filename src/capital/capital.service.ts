import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCapitalDto } from './dtos/create-capital.dto';
import { Capital } from './entity/capital.entity';

@Injectable()
export class CapitalService {
    constructor(@InjectRepository(Capital) private capitalRepository:Repository<Capital>){}
    
    async findAll(){
        return await this.capitalRepository.find({});
    }

    async create(capital:CreateCapitalDto){
        const entity = await this.capitalRepository.create({
            account: capital.account,
            balance:0.00,
            alipay:"",
            recharge:0.00,
            income:0.00,
            pay:0.00,
            withdrawal:0.00,
            consumptionAmount:0.00,
            freezingOfFunds:0.00,
            funSecurityLevel:100
        });
        await this.capitalRepository.save(entity);
        return {
            code:200,
            message:'插入成功'
        };
    }

    async findByAccount(account:string){
        return await this.capitalRepository.findOne({where:{account:account}})
    }

    async remove(id:string){
        const capitalId = await this.capitalRepository.findOne({where:{cid:id}});
        if(!capitalId){
            throw new NotFoundException('capital not found');
        }
        await this.capitalRepository.remove(capitalId);
        return {
            code:200,
            message:"删除成功"
        }
    }

    async removeAll(){
        const capital = await this.capitalRepository.find();
        if(!capital){
            throw new NotFoundException('capital not found');
        }
        capital.forEach(async (item)=>{
            await this.capitalRepository.remove(item);
        })
        return {
            code:200,
            message:"删除成功"
        };
    }

    async update(id:string,attrs:Partial<Capital>){
        const capital = await this.capitalRepository.findOne({where:{cid:id}});
        if(!capital){
            throw new NotFoundException('capital not found');
        }
        Object.assign(capital,attrs);
        await this.capitalRepository.save(capital);
        return {
            code:200,
            message:"修改成功"
        };
    }

    findOne(id:string){
        if(!id){
            return null;
        }
        return this.capitalRepository.findOne({where:{cid:id}});
    }
}
