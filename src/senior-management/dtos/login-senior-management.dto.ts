import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginSeniorManagementDto{
    @IsString()
    @ApiProperty({
        required:true,
        description: '账号',
    })
    account:string;

    @IsString()
    @ApiProperty({
        required:true,
        description: '密码',
    })
    password:string;
}