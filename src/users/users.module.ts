import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PasswordEncrypt } from './encrypt/password.encrypt';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthService,
        PasswordEncrypt,
        {
            provide:APP_INTERCEPTOR,
            useClass:CurrentUserInterceptor
        }
    ],
    exports:[UsersService]
})
export class UsersModule {}
