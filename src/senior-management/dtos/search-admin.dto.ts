import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class SearchAdminDto{
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: '账号',
    })
    account:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: '角色',
    })
    roles:string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: '状态',
    })
    forbidden:boolean;
}