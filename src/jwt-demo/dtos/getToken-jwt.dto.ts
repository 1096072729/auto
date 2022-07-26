import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class GetTokenJwtDto{
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