import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { NotFoundError } from "rxjs";
import { promisify } from "util";


const scrypt  = promisify(_scrypt);


@Injectable()
export class PasswordEncrypt{

    async encrypt(password:string){
       // generate a salt
       const salt  = randomBytes(8).toString('hex');

       // Hash the salt and the password together
       const hash = (await scrypt(password,salt,32)) as Buffer;

       // Join the hashed result and the salt together
       const result  = salt + '.' + hash.toString('hex');

       return result;
    } 
}