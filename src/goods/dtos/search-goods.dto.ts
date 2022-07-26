import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchGoodsDto{
    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:true,
        description: '商品ID',
    })
    goodsId:number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:true,
        description: '标题',
    })
    goodsTitle:string;


    @IsString()
    @IsOptional()
    @ApiProperty({
        required:true,
        description: '分类',
    })
    category:string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:true,
        description: '原价',
    })
    originalPrice:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:true,
        description: '当前价格',
    })
    currentPrice:number;
}