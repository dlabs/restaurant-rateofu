import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { StaffRoles } from 'src/shared/enums/staff-roles.enum';
import { StaffStatus } from 'src/shared/enums/staff-status.enum';

@Entity({ schema: 'public', name: 'staff' })
export class StaffEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    public name: string;

    @Column({ name: 'role', type: 'enum', nullable: false, enum: [StaffRoles.BARTENDER, StaffRoles.CHEF, StaffRoles.WAITER] })
    public role: StaffRoles;

    @Column({
        name: 'status',
        type: 'enum',
        enum: [StaffStatus.AVAILABLE, StaffStatus.BUSY, StaffStatus.NOT_ON_DUTY],
        nullable: false,
    })
    public status: StaffStatus;

    @Column({ name: 'access_token', type: 'varchar', nullable: false })
    public accessToken: string;
}
