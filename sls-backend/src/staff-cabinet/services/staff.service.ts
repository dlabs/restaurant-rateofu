import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { StaffStatus } from 'src/shared/enums/staff-status.enum';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { AuthRequest } from '../requests/auth.request';
import { OrderEntity } from 'src/database/entities/order.entity';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    ) {}

    public async authenticate({ name, role }: AuthRequest) {
        const existingStaff = await this.staffRepository.findOne({
            where: {
                name,
                role,
            },
        });

        if (existingStaff) {
            await this.staffRepository.update(existingStaff.id, { status: StaffStatus.AVAILABLE });
            return { accessToken: existingStaff.accessToken };
        }

        const newStaff = await this.staffRepository.save({
            name,
            role,
            status: StaffStatus.AVAILABLE,
            accessToken: nanoid(32),
        });

        return { accessToken: newStaff.accessToken };
    }

    public async getPendingOrders() {
        return this.orderRepository.find({ where: { isCompleted: false }, relations: ['orderItems'] });
    }
}
