import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { StaffService } from './services/staff.service';
import { StaffController } from './staff.controller';

@Module({
    imports: [TypeOrmModule.forFeature([StaffEntity])],
    controllers: [StaffController],
    providers: [StaffService],
})
export class StaffModule {}
