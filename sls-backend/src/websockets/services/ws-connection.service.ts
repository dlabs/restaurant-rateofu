import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsConnectionEntity } from 'src/database/entities/ws-connection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WsConnectionService {
    constructor(
        @InjectRepository(WsConnectionEntity)
        private readonly wsConnectionRepository: Repository<WsConnectionEntity>,
    ) {}

    public async registerConnection(connectionId: string, error: string) {
        const connection = await this.wsConnectionRepository.save({
            connectionId,
            error: JSON.stringify(error),
        });
        // TODO: Send WS event to registered client to attach ws conn to specific staff
        return connection;
    }
}
