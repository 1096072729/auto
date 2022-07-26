import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreateStarDto{
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
    starPrice:number;
}