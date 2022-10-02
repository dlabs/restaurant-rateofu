import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { DatabaseProviderTypes } from './database.provider.types';

export const databaseProviders = [
  {
    provide: DatabaseProviderTypes.MainDatabase,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
      return mongoose.connect(configService.get('DATABASE_HOST'));
    },
    inject: [ConfigService],
  },
];
