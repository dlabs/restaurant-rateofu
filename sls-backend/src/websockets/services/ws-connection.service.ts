import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsConnectionEntity } from 'src/database/entities/ws-connection.entity';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { Repository } from 'typeorm';
import { ConfigService } from 'src/config/config.service';
import { EnvKeys } from 'src/config/env-keys.enum';

@Injectable()
export class WsConnectionService {
    constructor(
        @InjectRepository(WsConnectionEntity)
        private readonly wsConnectionRepository: Repository<WsConnectionEntity>,
        private readonly configService: ConfigService, // private awsGatewayApi: ApiGatewayManagementApi = null,
    ) {}

    public async getAllActiveWsConnections() {
        return this.wsConnectionRepository.find();
    }

    public async registerConnection(connectionId: string) {
        await this.wsConnectionRepository.save({
            connectionId,
        });
        await this.sendMessageToSingleConnection(connectionId, { connectionAccepted: connectionId });
        return;
    }

    public async unregisterConnection(connectionId: string) {
        await this.wsConnectionRepository.delete({ connectionId });
        return;
    }

    public async sendMessageToSingleConnection(connectionId: string, payload: object) {
        // * Since we are operating in lambda context - it is okay to create new api instance per function invocation
        const awsGatewayApi = new ApiGatewayManagementApi({
            endpoint: this.configService.get(EnvKeys.AWS_API_GATEWAY_WS_ENDPOINT),
        });

        return awsGatewayApi
            .postToConnection({
                ConnectionId: connectionId,
                Data: Buffer.from(JSON.stringify(payload)),
            })
            .promise();
    }

    public async sendMessageToAllConnections(payload: object) {
        const awsGatewayApi = new ApiGatewayManagementApi({
            endpoint: this.configService.get(EnvKeys.AWS_API_GATEWAY_WS_ENDPOINT),
        });

        const allConnections = await this.getAllActiveWsConnections();
        return Promise.all(
            allConnections.map((conn) =>
                awsGatewayApi
                    .postToConnection({
                        ConnectionId: conn.connectionId,
                        Data: Buffer.from(JSON.stringify(payload)),
                    })
                    .promise(),
            ),
        );
    }
}
