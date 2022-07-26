import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class DeleteAdminPartDto{
    @IsArray()
    @ApiProperty({
        required:true,
        description: 'adminId',
    })
    adminIds:Array<number>;
}