import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

import { EnvKeys } from './env-keys.enum';

@Injectable()
export class ConfigService {
    constructor() {
        config();
    }

    public get<T>(key: EnvKeys): T {
        if (process.env[key] === undefined) {
            throw new TypeError(`Enviroment ${key} not set!`);
        }
        try {
            return JSON.parse(String(process.env[key])) as T;
        } catch (err) {
            return process.env[key] as unknown as T;
        }
    }
}
