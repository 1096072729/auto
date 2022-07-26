import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCapitalDto{
    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '余额',
    })
    balance:number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '支付宝账号',
    })
    alipay:string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '充值',
    })
    recharge:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '收入',
    })
    income:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '缴费',
    })
    pay:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '已提现',
    })
    withdrawal:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '消费金额',
    })
    consumptionAmount:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '冻结资金',
    })
    freezingOfFunds:number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required:false,
        description: '安全等级',
    })
    funSecurityLevel:number;
    
}