import { Module } from '@nestjs/common';
import { MainController } from './main.controller';

@Module({
    controllers: [MainController],
    providers: [],
})
export class MainModule {}
