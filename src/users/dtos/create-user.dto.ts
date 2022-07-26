import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export enum UserRole {
    User = 'user',
    Customer = 'customer',
}

export class CreateUserDto{
    @IsString()
    @ApiProperty({
        description: '账号',
    })
    account:string;

    @IsString()
    @ApiProperty({
        description: '密码',
    })
    password:string;

    // @IsString()
    // @ApiProperty({ enum: ['User', 'Customer'],description:'角色'})
    // role:UserRole;
}