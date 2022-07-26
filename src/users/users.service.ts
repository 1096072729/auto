import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto, UserRole } from './dtos/create-user.dto';
import { SearchUserMerchantDto } from './dtos/search-user-merchant.dto';
import { PasswordEncrypt } from './encrypt/password.encrypt';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository:Repository<User>,
        private pwdEncrypt:PasswordEncrypt
    ){}

    async createUser(account:string,password:string,roles:string){
        const forbidden = false;
        const registerDate = new Date();
        const entity = await this.usersRepository.create({account,password,roles,forbidden,registerDate});
        return await this.usersRepository.save(entity);
        
    }

    findOne(id:number){
        if(!id){
            return null;
        }
        return this.usersRepository.findOne({where:{userId:id}});
    }

    find(account:string){
        return this.usersRepository.find({where:{account}})
    }

    async deleteAll(){
        let users = await this.usersRepository.find({});
        users.forEach((item)=>{
            this.usersRepository.remove(item);
        })
        return {
            code:200,
            message:'删除成功'
        }
    }

    async deletePart(userIds:Array<number>){
        userIds.forEach((item)=>{
            this.remove(item);
        })
        return {
            code:200,
            message:'删除成功'
        }
    }

    async update(id:number,role:UserRole,attrs:Partial<User>){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('user not found');
        }
        
        if(attrs.password){
            await this.pwdEncrypt.encrypt(attrs.password).then((res)=>{
                attrs.password = res;
            });
        }
        Object.assign(user,attrs);
        user.roles = role;
        await this.usersRepository.save(user);
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
        await this.usersRepository.remove(user);
        return {
            code:200,
            message:'删除成功'
        };
    }

    async findAll(){
        return await this.usersRepository.find({});
    }

    async updateLoginDate(user:any){
        await this.usersRepository.save(user);
    }

    async getSearch(search:SearchUserMerchantDto){
        const whereOptions = [];
        let options = {};

        console.log(search);

        search.account?whereOptions.push({label:'account',value:search.account}):'';
        search.name?whereOptions.push({label:'name',value:search.name}):'';
        search.telephone?whereOptions.push({label:'telephone',value:search.telephone}):'';
        search.sex?whereOptions.push({label:'sex',value:search.sex}):'';
        search.forbidden != null?whereOptions.push({label:'forbidden',value:search.forbidden}):false;
        search.grade?whereOptions.push({label:'grade',value:search.grade}):'';

        for(let i=0;i<whereOptions.length;i++){
            options[whereOptions[i].label] = whereOptions[i].value;
        }

        console.log(options);

        return await this.usersRepository.find({
            where:options
        });
    }
}
