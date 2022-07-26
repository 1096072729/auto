import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class DeletePartGoodsDto{
    @IsArray()
    @ApiProperty({
        description: 'goodsIds',
    })
    goodsIds:Array<number>;
}