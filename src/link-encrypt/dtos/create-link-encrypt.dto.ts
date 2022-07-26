import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreateLinkEncryptDto{
    @IsString()
    @ApiProperty({
        required:true,
        description: '账号',
    })
    account:string;

    @IsString()
    @ApiProperty({
        required:true,
        description: '密钥',
    })
    secretKey:string;
}