import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsConnectionEntity } from 'src/database/entities/ws-connection.entity';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { Repository } from 'typeorm';
import { ConfigService } from 'src/config/config.service';
import { EnvKeys } from 'src/config/env-keys.enum';
import { StaffEntity } from 'src/database/entities/staff.entity';

@Injectable()
export class WsConnectionService {
    constructor(
        @InjectRepository(WsConnectionEntity)
        private readonly wsConnectionRepository: Repository<WsConnectionEntity>,
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,
        private readonly configService: ConfigService, // private awsGatewayApi: ApiGatewayManagementApi = null,
    ) {}

    public async getAllActiveWsConnections() {
        return this.wsConnectionRepository.find();
    }

    public async registerConnection(connectionId: string) {
        await this.wsConnectionRepository.save({
            connectionId,
        });
        return;
    }

    public async unregisterConnection(connectionId: string) {
        await this.wsConnectionRepository.delete({ connectionId });
        // TODO: Consider setting staff status to not_on_duty here if no single conn remain
        return;
    }

    public async linkConnectionToStaff(connectionId: string, accessToken: string) {
        const targetStaff = await this.staffRepository.findOne({ accessToken });
        if (targetStaff) {
            await this.wsConnectionRepository.update({ connectionId }, { staffId: targetStaff.id });
        }
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
        // * Since we are operating in lambda context - it is okay to create new api instance per function invocation
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
