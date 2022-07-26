import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBuyRecordDto{
    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '用户id',
    })
    userId:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '商品id',
    })
    goodsId:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '购买价格',
    })
    buyPrice:number;

}