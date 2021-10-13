import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsConnectionEntity } from 'src/database/entities/ws-connection.entity';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { Repository } from 'typeorm';
import { ConfigService } from 'src/config/config.service';
import { EnvKeys } from 'src/config/env-keys.enum';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { StaffStatus } from 'src/shared/enums/staff-status.enum';

export interface WsEvent {
    event: 'newOrder' | 'orderItemStatusChanged' | 'multipleOrderItemsStatusChanged' | 'orderCompleted' | 'batchReady';

    payload: object;
}

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
        const targetConnection = await this.wsConnectionRepository.findOne({ connectionId });
        await this.wsConnectionRepository.delete(targetConnection.id);

        const noMoreConnections =
            (await this.wsConnectionRepository.find({ where: { staffId: targetConnection.staffId } })).length === 0;

        if (noMoreConnections) {
            await this.staffRepository.update(targetConnection.staffId, { status: StaffStatus.NOT_ON_DUTY });
        }
        return;
    }

    public async linkConnectionToStaff(connectionId: string, accessToken: string) {
        const targetStaff = await this.staffRepository.findOne({ accessToken });
        if (targetStaff) {
            const asyncOperations = [this.wsConnectionRepository.update({ connectionId }, { staffId: targetStaff.id })];

            if (targetStaff.status === StaffStatus.NOT_ON_DUTY)
                asyncOperations.push(this.staffRepository.update(targetStaff.id, { status: StaffStatus.AVAILABLE }));

            await Promise.all(asyncOperations);
        }
        return;
    }

    public async sendMessageToSingleStaffMember(staffId: number, wsEvent: WsEvent) {
        const targetStaffConnections = await this.wsConnectionRepository.find({ staffId });

        // * Since we are operating in lambda context - it is okay to create new api instance per function invocation
        const awsGatewayApi = new ApiGatewayManagementApi({
            endpoint: this.configService.get(EnvKeys.AWS_API_GATEWAY_WS_ENDPOINT),
        });

        return targetStaffConnections.map((tsc) =>
            awsGatewayApi
                .postToConnection({
                    ConnectionId: tsc.connectionId,
                    Data: Buffer.from(JSON.stringify(wsEvent)),
                })
                .promise(),
        );
    }

    public async sendMessageToAllConnections(wsEvent: WsEvent) {
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
                        Data: Buffer.from(JSON.stringify(wsEvent)),
                    })
                    .promise(),
            ),
        );
    }
}
