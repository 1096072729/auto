import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";
import { CreateSeniorManagementDto } from "../dtos/create-senior-management.dto";
import { SeniorManagementService } from "../senior-management.service";

const scrypt  = promisify(_scrypt);


@Injectable()
export class AuthService{
    constructor(private seniorService:SeniorManagementService){}

    async signup(admin:CreateSeniorManagementDto){
       // see if account is in use
        const users = await this.seniorService.find(admin.account);
        if(users.length){
            throw new BadRequestException('account in use');
        }
       // hash the users password
       // generate a salt
       const salt  = randomBytes(8).toString('hex');

       // Hash the salt and the password together
       const hash = (await scrypt(admin.password,salt,32)) as Buffer;

       // Join the hashed result and the salt together
       const result  = salt + '.' + hash.toString('hex');

       // create a new user and save it
       //由于sqlite不支持数组存储，那么在这里先字符串链接，保存到数据库中
       const user = await this.seniorService.createUser(admin.account,result);
       // return the user
       return user;
    } 

    async signin(account:string,password:string){
        const [user] = await this.seniorService.find(account);
        if(!user){
            throw new NotFoundException('account not found');
        }
        const [salt,storeHash] = user.password.split('.');

        const hash = await scrypt(password,salt,32) as Buffer;

        if(storeHash !== hash.toString('hex')){
            throw new BadRequestException('bad password');
        }

        if(user.forbidden){
            return {
                code:5003,
                message:'账号已被禁用',
                adminId:null 
            }
        }else{
            user.loginDate = new Date();
            await this.seniorService.updateLoginDate(user);
            let fuser:any = user;
            fuser.code = 200;
            fuser.message = '登录成功';
            return fuser;
        }

        

    }
}