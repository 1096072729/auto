import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { BuyRecordsService } from './buy-records.service';
import { CreateBuyRecordDto } from './dtos/create-buy-record.dto';
import { DeletePartBuyRecordsDto } from './dtos/delete-part-buy-records.dto';
import { SearchBuyRecordsDto } from './dtos/search-buy-records.dto';
import { UpdateBuyRecordDto } from './dtos/update-buy-record.dto';

@ApiTags('购买记录接口')
@Controller('buyRecords')
export class BuyRecordsController {

    constructor(private buyRecordsService:BuyRecordsService){}
    @Post('create')
    async createBuyRecord(@Body() body:CreateBuyRecordDto){
        return await this.buyRecordsService.create(body);
    }

    @Post('search')
    async getSearch(@Body() body:SearchBuyRecordsDto){
        return await this.buyRecordsService.getSearch(body);
    }

    @Get('findAll')
    async findAll(){
        return await this.buyRecordsService.findAll();
    }

    @Get('user/:id')
    async findbyUser(@Param('id') id:string){
        return await this.buyRecordsService.findByUser(id);
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return await this.buyRecordsService.findOne(id);
    }

    @Delete('deleteAll')
    async deleteAll(){
        return await this.buyRecordsService.removeAll();
    }

    @Delete('deletePart')
    @ApiProperty({description:'传入数组：[1,2,3]'})
    async deletePart(@Body() body:DeletePartBuyRecordsDto){
        return await this.buyRecordsService.deletePart(body.orderIds);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id:string){
        return await this.buyRecordsService.remove(id);
    }

    @Patch(':id')
    async update(@Param('id') id:string,@Body() body:UpdateBuyRecordDto){
        return await this.buyRecordsService.update(id,body);
    }


}
