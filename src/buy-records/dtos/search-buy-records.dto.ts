import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchBuyRecordsDto{
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: '订单ID',
    })
    orderId:string;
}