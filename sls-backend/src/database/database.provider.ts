import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { EnvKeys } from 'src/config/env-keys.enum';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return TypeOrmConfigService.getOptions(this.configService);
    }

    public static getOptions(configService: ConfigService, sync: boolean = false): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: configService.get(EnvKeys.DB_HOST),
            port: configService.get(EnvKeys.DB_PORT),
            username: configService.get(EnvKeys.DB_USER),
            password: configService.get(EnvKeys.DB_PASS),
            database: configService.get(EnvKeys.DB_DB),
            entities: [],
            synchronize: false,
            logging: false,
        };
    }
}
