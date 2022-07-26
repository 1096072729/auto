import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordEncrypt } from 'src/users/encrypt/password.encrypt';
import { Repository } from 'typeorm';
import { SearchAdminDto } from './dtos/search-admin.dto';
import { AdminRole } from './dtos/update-senior-management.dto';
import { SeniorManagement } from './entity/senior-managerment.entity';

@Injectable()
export class SeniorManagementService {
    constructor(
        @InjectRepository(SeniorManagement) private seniorRepository:Repository<SeniorManagement>,
        private pwdEncrypt:PasswordEncrypt
    ){}

    async createUser(account:string,password:string){
        const roles = 'admin';
        const forbidden = false;
        const registerDate = new Date();
        const loginDate = new Date();
        const entity = await this.seniorRepository.create({account,password,roles,forbidden,registerDate,loginDate});
        return await this.seniorRepository.save(entity);
        
    }

    findOne(id:number){
        if(!id){
            return null;
        }
        return this.seniorRepository.findOne({where:{adminId:id}});
    }



    find(account:string){
        return this.seniorRepository.find({where:{account}})
    }

    async deletePart(adminIds:Array<number>){
        adminIds.forEach((adminId)=>{
            this.remove(adminId);
        })
        return {
            code:200,
            message:'删除成功'
        }
    }

    async getSearch(search:SearchAdminDto){
        const whereOptions = [];
        let options = {};

        console.log(search);

        search.account?whereOptions.push({label:'account',value:search.account}):'';
        if(search.roles != null){
            search.roles == '普通管理员'?whereOptions.push({label:'roles',value:'admin'}):whereOptions.push({label:'roles',value:'senior'});
        }
        
        search.forbidden != null?whereOptions.push({label:'forbidden',value:search.forbidden}):false;

        for(let i=0;i<whereOptions.length;i++){
            options[whereOptions[i].label] = whereOptions[i].value;
        }

        console.log(options);

        return await this.seniorRepository.find({
            where:options
        });
    }

    async removeAll(){
        let senior = await this.seniorRepository.find();
        senior.forEach((item)=>{
            this.seniorRepository.remove(item);
        })
        return {
            code:200,
            message:'删除成功'
        }
    }

    async updateSenior(id:number,attrs:Partial<SeniorManagement>){
        const senior = await this.findOne(id);
        if(!senior){
            throw new NotFoundException('senior not found');
        }
        if(attrs.password){
            await this.pwdEncrypt.encrypt(attrs.password).then((res)=>{
                attrs.password = res;
            });
        }
        Object.assign(senior,attrs);
        await this.seniorRepository.save(senior);
        return {
            code:200,
            message:'更新成功'
        };
    }

    async remove(id:number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('user not found');
        }
        await this.seniorRepository.remove(user);
        return {
            code:200,
            message:'删除成功'
        };
    }

    async findAll(){
        return await this.seniorRepository.find({});
    }

    async findByAccount(account:string){
        return await this.seniorRepository.findOne({where:{account:account}});

    }

    async updateLoginDate(user:any){
        await this.seniorRepository.save(user);
    }
}
