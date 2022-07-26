import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { AccessRoles } from './decorators/access-roles.decorator';
import { CurrentUser } from './decorators/current-user.decorators';
import { CreateUserDto, UserRole } from './dtos/create-user.dto';
import { DeletePartUserDto } from './dtos/delete-part-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { SearchUserMerchantDto } from './dtos/search-user-merchant.dto';
import { Grade, UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role-guard.guard';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UsersService } from './users.service';


@ApiTags('用户接口')
@Controller('auth')
// @Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private userService:UsersService,
        private authServer:AuthService
    ){}

    @Post('signup')
    @ApiResponse({ status: 200, description: '注册成功'})
    @ApiQuery({ name: 'role', enum: UserRole })
    async createUser(@Body() body:CreateUserDto,@Query('role') role: UserRole,@Session() session:any){
        const user = await this.authServer.signup(body.account,body.password,role);
        session.userId = user.userId;
        return {
            code:200,
            message:'注册成功'
        };
    }

    @Post('search')
    async getSearch(@Body() body:SearchUserMerchantDto){
        return await this.userService.getSearch(body);
    }

    @Post('signin')
    // @ApiBody({ type: [LoginUserDto] })
    async signin(@Body() body:LoginUserDto,@Session() session){
        const user = await this.authServer.signin(body.account,body.password);
        session.userId = user.userId;
        return {
            code:user.code,
            message: user.message,
        };
    }

    @Get('whoami')
    // @UseGuards(RoleGuard)
    // @AccessRoles('teacher')
    whoAmI(@CurrentUser() user:string){
        if(user){
            return {
                code:200,
                message:'登录状态',
                user:user
            }
        }else{
            return{
                code:5002,
                message:'请先登录'
            }
        }
    }

    @Post('signout')
    @ApiProperty({description:'用户退出'})
    signOut(@Session() session:any){
        session.userId = null;
        return {
            code:200,
            message:'退出成功'
        };
    }
    
    @Get()
    findAllUsers(@Query('account') account:string){
        return this.userService.find(account);
    }

    @Get('findAll')
    async listUser(){
        return await this.userService.findAll();
    }

    @Delete('deleteAll')
    async deleteAll(){
        return await this.userService.deleteAll();
    }

    @Delete('deletePart')
    @ApiProperty({description:'传入数组：[1,2,3]'})
    async deletePart(@Body() body:DeletePartUserDto){
        return await this.userService.deletePart(body.userIds);
    }

    @Get('/:id')
    async findUser(@Param('id') id:string){
        console.log('handler is running...');
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Delete('/:id')
    async removeUser(@Param('id') id:string){
        await this.userService.remove(parseInt(id));
        return {
            code:200,
            message:'删除成功'
        };
    }

    @Patch('/:id')
    @ApiQuery({name: 'role', enum: UserRole})
    async updateUser(@Param('id') id:number,@Query('role') role: UserRole,@Body() body:UpdateUserDto){
        await this.userService.update(id,role,body);
        return {
            code:200,
            message:'更新成功'
        };
    }

}

