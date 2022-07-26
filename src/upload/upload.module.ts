import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entity/upload.entity';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  // 必须导入该实体类，不然数据库不会创建upload数据表，之后的操作也没有用处
  imports: [TypeOrmModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [UploadService],
  exports:[UploadService]
})
export class UploadModule {}
