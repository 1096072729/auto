import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { CreateSeniorManagementDto } from './dtos/create-senior-management.dto';
import { DeleteAdminPartDto } from './dtos/delete-admin-part.dto';
import { LoginSeniorManagementDto } from './dtos/login-senior-management.dto';
import { SearchAdminDto } from './dtos/search-admin.dto';
import { UpdateAdminManagementDto } from './dtos/update-admin-managerment.dto';
import { AdminRole, UpdateSeniorManagementDto } from './dtos/update-senior-management.dto';
import { SeniorManagementService } from './senior-management.service';

@ApiTags('高级管理员接口')
@Controller('admin')
export class SeniorManagementController {
    constructor(
        private seniorManagementService:SeniorManagementService,
        private authService:AuthService
    ){}

    @Post('signup')
    async createGoods(@Body() body:CreateSeniorManagementDto,@Session() session:any){
        const admin = await this.authService.signup(body);
        session.adminId = admin.adminId;
        return {
            code:200,
            message:'注册成功'
        }
    }

    @Post('signin')
    async signin(@Body() body:LoginSeniorManagementDto,@Session() session){
        const user = await this.authService.signin(body.account,body.password);
        session.adminId = user.adminId;
        return {
            code:user.code,
            message:user.message
        };
    }

    @Post('signout')
    signOut(@Session() session:any){
        session.adminId = null;
        return {
            code:200,
            message:'退出成功'
        };
    }

    @Post('search')
    async getSearch(@Body() body:SearchAdminDto){
        return await this.seniorManagementService.getSearch(body);
    }

    @Get('findAll')
    async findAll(){
        return await this.seniorManagementService.findAll();
    }

    @Get('account/:account')
    async findByAccount(@Param('account') account:string){
        return await this.seniorManagementService.findByAccount(account);
    }

    @Get(':id')
    async findOne(@Param('id') id:number){
        return await this.seniorManagementService.findOne(id);
    }

    @Delete('deletePart')
    @ApiProperty({description:'传入数组：[1,2,3]'})
    async deletePart(@Body() body:DeleteAdminPartDto){
        return await this.seniorManagementService.deletePart(body.adminIds);
    }

    @Delete('deleteAll')
    async deleteAll(){
        return await this.seniorManagementService.removeAll();
    }

    @Delete(':id')
    async deleteGoodsOfId(@Param('id') id:number){
        return await this.seniorManagementService.remove(id);
    }

    @Patch('senior/:id')
    async updateSenior(@Param('id') id:number,@Body() body:UpdateSeniorManagementDto){
        return await this.seniorManagementService.updateSenior(id,body);
    }
}
