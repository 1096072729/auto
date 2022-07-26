import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CurrentUserInterceptor } from './users/interceptors/current-user.interceptor';
import { GoodsController } from './goods/goods.controller';
import { GoodsModule } from './goods/goods.module';
import { BuyRecordsController } from './buy-records/buy-records.controller';
import { BuyRecordsModule } from './buy-records/buy-records.module';
import { LinkEncryptController } from './link-encrypt/link-encrypt.controller';
import { LinkEncryptModule } from './link-encrypt/link-encrypt.module';
import { BuyRecords } from './buy-records/entity/buy-records.entity';
import { Goods } from './goods/entity/goods.entity';
import { LinkEncrypt } from './link-encrypt/entity/link-encrypt.entity';
import { CapitalController } from './capital/capital.controller';
import { CapitalModule } from './capital/capital.module';
import { SeniorManagementController } from './senior-management/senior-management.controller';
import { SeniorManagementModule } from './senior-management/senior-management.module';
import { Capital } from './capital/entity/capital.entity';
import { SeniorManagement } from './senior-management/entity/senior-managerment.entity';
import { JwtDemoModule } from './jwt-demo/jwt-demo.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { Upload } from './upload/entity/upload.entity';
import { StarController } from './star/star.controller';
import { StarModule } from './star/star.module';
import { Star } from './star/entitys/star.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    database:'auto_sales',
    entities:[User,BuyRecords,Goods,LinkEncrypt,Capital,SeniorManagement,Upload,Star],
    synchronize:true,
    host: "120.55.54.248",
    port: 3306,
    username: "ubuntu",
    password: "123456",
    // logging:true
  }), UsersModule, GoodsModule, BuyRecordsModule, LinkEncryptModule, CapitalModule, SeniorManagementModule, JwtDemoModule, UploadModule, StarModule],
  controllers: [AppController,GoodsController, BuyRecordsController, LinkEncryptController, CapitalController, SeniorManagementController, UploadController, StarController],
  providers: [
    AppService,
    {
      provide:APP_INTERCEPTOR,
      useClass:CurrentUserInterceptor
    },{
      provide:APP_PIPE,useValue:new ValidationPipe()
    }
  ],
})
export class AppModule {}
