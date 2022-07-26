import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEncrypt } from 'src/users/encrypt/password.encrypt';
import { AuthService } from './auth/auth.service';
import { SeniorManagement } from './entity/senior-managerment.entity';
import { SeniorManagementController } from './senior-management.controller';
import { SeniorManagementService } from './senior-management.service';

@Module({
    imports:[TypeOrmModule.forFeature([SeniorManagement])],
    controllers: [SeniorManagementController],
    providers:[
        SeniorManagementService,
        AuthService,
        PasswordEncrypt
    ],
    exports:[SeniorManagementService,AuthService]
})
export class SeniorManagementModule {}
