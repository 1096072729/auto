import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class SearchValueDto{
    @IsString()
    @ApiProperty({
        required:true,
        description: '搜索值',
    })
    searchValue:string;
}