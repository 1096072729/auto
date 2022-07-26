import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateLinkEncryptDto } from './dtos/create-link-encrypt.dto';
import { UpdateLinkEncryptDto } from './dtos/update-link-encrypt.dto';
import { LinkEncryptService } from './link-encrypt.service';

@ApiTags('链接加密接口')
@Controller('linkEncrypt')
export class LinkEncryptController {
    constructor(private linkEncryptService:LinkEncryptService){}

    @Post('create')
    async createGoods(@Body() body:CreateLinkEncryptDto){
        return await this.linkEncryptService.create(body);
    }

    @Get('account')
    @ApiQuery({ name: 'account' })
    async findLinkByAccount(@Query('account') query:any){
        console.log(query);
        return await this.linkEncryptService.findByAccount(query);
    }

    @Get('findAll')
    findAll(){
        return this.linkEncryptService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.linkEncryptService.findOne(id);
    }

    @Delete('deleteAll')
    deleteAll(){
        return this.linkEncryptService.removeAll();
    }

    @Delete(':id')
    deleteGoodsOfId(@Param('id') id:number){
        return this.linkEncryptService.remove(id);
    }

    @Patch(':id')
    updateGoods(@Param('id') id:number,@Body() body:UpdateLinkEncryptDto){
        return this.linkEncryptService.update(id,body)
    }
}
