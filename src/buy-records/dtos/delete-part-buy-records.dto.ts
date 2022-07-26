import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class DeletePartBuyRecordsDto{
    @IsArray()
    @ApiProperty({
        description: 'orderIds',
    })
    orderIds:Array<string>;
}