import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkEncryptDto } from './dtos/create-link-encrypt.dto';
import { LinkEncrypt } from './entity/link-encrypt.entity';

@Injectable()
export class LinkEncryptService {
    constructor(@InjectRepository(LinkEncrypt) private linkEncryptRepository:Repository<LinkEncrypt>){}
    
    async findAll(){
        return await this.linkEncryptRepository.find({});
    }

    async findByAccount(account:string){
        console.log(account);
        const info = await this.linkEncryptRepository.findOne({where:{account}});
        console.log(info);
        if(!info){
            return {
                code:5002,
                message:'查询无果'
            }
        }
        return info;
    }

    async create(linkEncrypt:CreateLinkEncryptDto){
        const account = await this.linkEncryptRepository.find({where:{account:linkEncrypt.account}});
        if(account.length){
            throw new NotFoundException('account already found');
        }
        const entity = await this.linkEncryptRepository.create(linkEncrypt);
        await this.linkEncryptRepository.save(entity);
        return {
            code:200,
            message:'插入成功'
        };
    }

    async remove(id:number){
        const linkEncrypt = await this.linkEncryptRepository.findOne({where:{id}});
        if(!linkEncrypt){
            throw new NotFoundException('account not found');
        }
        await this.linkEncryptRepository.remove(linkEncrypt);
        return {
            code:200,
            message:"删除成功"
        }
    }

    async removeAll(){
        const goods = await this.linkEncryptRepository.find();
        if(!goods){
            throw new NotFoundException('account not found');
        }
        goods.forEach(async (item)=>{
            await this.linkEncryptRepository.remove(item);
        })
        return {
            code:200,
            message:"删除成功"
        };
    }

    async update(id:number,attrs:Partial<LinkEncrypt>){
        const linkEncrypt = await this.linkEncryptRepository.findOne({where:{id}});
        if(!linkEncrypt){
            throw new NotFoundException('account not found');
        }
        Object.assign(linkEncrypt,attrs);
        await this.linkEncryptRepository.save(linkEncrypt);
        return {
            code:200,
            message:"修改成功"
        };
    }

    findOne(id:number){
        if(!id){
            return null;
        }
        return this.linkEncryptRepository.findOne({where:{id}});
    }
}
