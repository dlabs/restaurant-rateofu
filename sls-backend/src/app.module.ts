import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CustomerModule } from './customer-cabinet/customer.module';
import { TypeOrmConfigService } from './database/database.provider';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            inject: [ConfigService],
        }),
        CustomerModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
