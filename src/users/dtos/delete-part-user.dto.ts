import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class DeletePartUserDto{
    @IsArray()
    @ApiProperty({
        description: 'userIds',
    })
    userIds:Array<number>;
}