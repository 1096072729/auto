import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreateGoodsDto{
    @IsString()
    @ApiProperty({
        required:true,
        description: '标题',
    })
    goodsTitle:string;

    @IsString()
    @ApiProperty({
        required:true,
        description: '图片',
    })
    goodsPic:string;

    @IsString()
    @ApiProperty({
        required:true,
        description: '描述',
    })
    goodsDes:string;

    @IsString()
    @ApiProperty({
        required:true,
        description: '备注',
    })
    comment:string;

    @IsString()
    @ApiProperty({
        required:true,
        description: '加密链接',
    })
    encryptedLink:string;

    @IsString()
    @ApiProperty({
        required:true,
        description: '分类',
    })
    category:string;

    @IsNumber()
    @ApiProperty({
        required:true,
        description: '剩余量',
    })
    residue:number;

    @IsNumber()
    @ApiProperty({
        required:true,
        description: '原价',
    })
    originalPrice:number;

    @IsNumber()
    @ApiProperty({
        required:true,
        description: '当前价格',
    })
    currentPrice:number;

    @IsString()
    @ApiProperty({
        required:true,
        description: '商家账号',
    })
    userAccount:string;
}