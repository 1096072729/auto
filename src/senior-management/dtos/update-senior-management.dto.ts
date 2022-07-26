import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export enum AdminRole {
    Senior = 'senior',
    Admin = 'admin',
}
export class UpdateSeniorManagementDto{
    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '账号',
    })
    account:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '密码',
    })
    password:string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '是否禁用',
    })
    forbidden:boolean;
}