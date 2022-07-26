import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateGoodsDto{
    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '标题',
    })
    goodsTitle:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '图片',
    })
    goodsPic:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '描述',
    })
    goodsDes:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '备注',
    })
    comment:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '加密链接',
    })
    encryptedLink:string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '分类',
    })
    category:string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '剩余量',
    })
    residue:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '原价',
    })
    originalPrice:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '当前价格',
    })
    currentPrice:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '销售量',
    })
    salesNumber:number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '是否删除',
    })
    isDelete:boolean;
}