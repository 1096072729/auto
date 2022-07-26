import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUserDto{
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
}