import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class SearchUserMerchantDto{
    @IsString()
    @ApiProperty({
        description: '账号',
    })
    @IsOptional()
    account:string;

    @IsString()
    @ApiProperty({
        description: '姓名',
    })
    @IsOptional()
    name:string;
    
    @IsString()
    @ApiProperty({
        description: '电话号码',
    })
    @IsOptional()
    telephone:string;

    @IsString()
    @ApiProperty({
        description: '性别',
    })
    @IsOptional()
    sex:string;

    @IsBoolean()
    @ApiProperty({
        description: '状态',
    })
    @IsOptional()
    forbidden:boolean;

    @IsString()
    @ApiProperty({
        description: '等级',
    })
    @IsOptional()
    grade:string;
}