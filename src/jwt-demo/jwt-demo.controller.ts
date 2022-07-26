import { JwtDemoService } from './jwt-demo.service';
import { JwtService } from '@nestjs/jwt';
import { Controller, UseGuards, Get, Post, Req, Body, Header, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { TokenInJwtDto } from './dtos/tokenIn-jwt.dto';
import { GetTokenJwtDto } from './dtos/getToken-jwt.dto';

@ApiTags('JWT')
@Controller('jwt')
export class JwtDemoController {
  JwtDemoService: any;
  constructor(
    private jwtDemoService: JwtDemoService
  ){}

  //使用jwt验证token的端口
  @UseGuards( AuthGuard('jwt'))
  @Post('tokenIn')
  aPost(@Req() req){
    return req.user;
  }

  @Post('getToken')
  getTokenByUserId(@Body() body: GetTokenJwtDto){
    return this.jwtDemoService.createToken(body);
  }

}
