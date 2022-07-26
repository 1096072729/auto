import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBuyRecordDto{
    @IsNumber()
    @ApiProperty({
        required:true,
        description: '用户id',
    })
    userId:number;

    @IsNumber()
    @ApiProperty({
        required:true,
        description: '商品id',
    })
    goodsId:number;

    @IsNumber()
    @ApiProperty({
        required:false,
        description: '购买价格',
    })
    buyPrice:number;

}