import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export enum UserRole {
    User = 'user',
    Customer = 'customer',
}

export enum Grade {
    Ordinary = '普通会员',
    Bronze = '青铜会员',
    Silver = '白银会员',
    Gold = '黄金会员',
    Diamond = '钻石会员'
}

export class UpdateUserDto{
    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '头像',
    })
    avatarUrl:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '姓名',
    })
    name:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '性别',
    })
    sex:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '密码',
    })
    password:string;

    // @IsString()
    // @IsOptional()
    // @ApiProperty({
    //     required:false,
    //     description: '角色',
    // })
    // roles:string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '是否禁用',
    })
    forbidden:boolean;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '电话号码',
    })
    telephone:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '等级',
    })
    grade:Grade;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '信用分',
    })
    creditScore:number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '备注',
    })
    comment:string;

}