import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CapitalService } from './capital.service';
import { CreateCapitalDto } from './dtos/create-capital.dto';
import { UpdateCapitalDto } from './dtos/update-capital.dto';

@ApiTags('资金表接口')
@Controller('capital')
export class CapitalController {
    constructor(private capitalService:CapitalService){}

    @Post('create')
    async create(@Body() body:CreateCapitalDto){
        return await this.capitalService.create(body);
    }

    @Get('findAll')
    async findAll(){
        return await this.capitalService.findAll();
    }

    @Get('account/:account')
    async findByAccount(@Param('account') param:string){
        return await this.capitalService.findByAccount(param);
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return await this.capitalService.findOne(id);
    }

    @Delete('deleteAll')
    async deleteAll(){
        return await this.capitalService.removeAll();
    }

    @Delete(':id')
    async deleteGoodsOfId(@Param('id') id:string){
        return await this.capitalService.remove(id);
    }

    @Patch(':id')
    async update(@Param('id') id:string,@Body() body:UpdateCapitalDto){
        return await this.capitalService.update(id,body)
    }
}
