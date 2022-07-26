import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateLinkEncryptDto{
    @IsString()
    @ApiProperty({
        required:true,
        description: '密钥',
    })
    secretKey:string;
}