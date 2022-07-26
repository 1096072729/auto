import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStarDto } from './dtos/create-star.dto';
import { StarService } from './star.service';
@ApiTags('收藏接口')
@Controller('star')
export class StarController {
    constructor(private starService:StarService){}
    @Post('create')
    async createStar(@Body() body:CreateStarDto){
        return await this.starService.create(body);
    }

    @Get('findAll')
    async findAll(){
        return await this.starService.findAll();
    }

    @Get('user/:id')
    async findbyUser(@Param('id') id:string){
        return await this.starService.findByUser(id);
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return await this.starService.findOne(id);
    }

    @Delete('deleteAll')
    async deleteAll(){
        return await this.starService.removeAll();
    }

    @Delete(':id')
    async deleteOne(@Param('id') id:string){
        return await this.starService.remove(id);
    }

    @Delete('user/:id')
    async deleteByUser(@Param('id') id:string){
        return await this.starService.deleteByUser(id);
    }


}
