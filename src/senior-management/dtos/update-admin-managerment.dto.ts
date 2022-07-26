import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export enum AdminRole {
    Senior = 'senior',
    Admin = 'admin',
}
export class UpdateAdminManagementDto{
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