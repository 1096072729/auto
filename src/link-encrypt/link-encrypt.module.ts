import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEncrypt } from './entity/link-encrypt.entity';
import { LinkEncryptController } from './link-encrypt.controller';
import { LinkEncryptService } from './link-encrypt.service';

@Module({
    imports:[TypeOrmModule.forFeature([LinkEncrypt])],
    controllers: [LinkEncryptController],
    providers:[
        LinkEncryptService
    ],
    exports:[LinkEncryptService]
})
export class LinkEncryptModule {}
