import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { StaffStatus } from 'src/shared/enums/staff-status.enum';
import { Repository } from 'typeorm';
import cryptoRandomString from 'crypto-random-string';
import { AuthRequest } from '../requests/auth.request';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,
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
            accessToken: cryptoRandomString({ length: 32, type: 'url-safe' }),
        });

        return { accessToken: newStaff.accessToken };
    }
}
