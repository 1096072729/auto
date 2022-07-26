import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtDemoService } from './jwt-demo.service';
import { JwtDemoController } from './jwt-demo.controller';
import {  JwtModule, JwtService } from '@nestjs/jwt';
import {jwtKey} from './config'
import { AuthService } from 'src/users/auth.service';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      //生成token的key
      secret:jwtKey.secret,
      // signOption可以在JwtModule设定
      // 或是在createToken时候设定
      signOptions: {
        //token的有效时长
          expiresIn: '1h',
      },
  }),
  ],
  providers: [JwtDemoService,JwtStrategy,AuthService],
  controllers: [JwtDemoController]
})
export class JwtDemoModule {}

