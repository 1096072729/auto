import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateGoodsDto } from './dtos/create-goods.dto';
import { DeletePartGoodsDto } from './dtos/delete-part-goods.dto';
import { SearchGoodsDto } from './dtos/search-goods.dto';
import { SearchValueDto } from './dtos/search-value-dto';
import { UpdateGoodsDto } from './dtos/update-goods.dto';
import { GoodsService } from './goods.service';

@ApiTags('商品接口')
@Controller('goods')
export class GoodsController {

    constructor(private goodsService:GoodsService){}

    @Post('create')
    async createGoods(@Body() body:CreateGoodsDto){
        return await this.goodsService.createGoods(body);
    }

    @Post('search')
    async getSearch(@Body() body:SearchGoodsDto){
        return await this.goodsService.getSearch(body);
    }

    @Post('paging/:page')
    async getPages(@Param('page') page:number,@Body() body:SearchValueDto){
        return await this.goodsService.getSearchOfPage(page,body);
    }

    @Post('user/:account')
    async getGoodsById(@Param('account') account:string){
        return await this.goodsService.getGoodsById(account);
    }

    @Get('orderGoods/:orderId')
    async getOrderGoods(@Param('orderId') orderId:string){
        return await this.goodsService.getOrderGoods(orderId);
    }

    @Get('userAccount/findAll')
    async getAllWithGoods(){
        return await this.goodsService.getAllWithGoods();
    }

    @Get('userAccount/:account')
    async getByUserAccount(@Param('account') account:string){
        return await this.goodsService.getByUserAccount(account);
    }

    @Get('findAll')
    findAll(){
        return this.goodsService.findAll();
    }

    @Get('findBySecret/:secret')
    findBySecret(@Param('secret') secret:string){
        return this.goodsService.findBySecret(secret);
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.goodsService.findOne(id);
    }

    @Delete('deleteAll')
    deleteAll(){
        return this.goodsService.removeAll();
    }

    @Delete('deletePart')
    @ApiProperty({description:'传入数组：[1,2,3]'})
    async deletePart(@Body() body:DeletePartGoodsDto){
        return await this.goodsService.deletePart(body.goodsIds);
    }

    @Delete(':id')
    deleteGoodsOfId(@Param('id') id:number){
        return this.goodsService.remove(id);
    }

    @Patch(':id')
    updateGoods(@Param('id') id:number,@Body() body:UpdateGoodsDto){
        return this.goodsService.updateGoods(id,body)
    }

}
