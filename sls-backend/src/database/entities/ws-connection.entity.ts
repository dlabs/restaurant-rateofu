import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StaffEntity } from './staff.entity';

@Entity({ schema: 'public', name: 'ws_connections' })
export class WsConnectionEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'connection_id', type: 'varchar', nullable: false })
    public connectionId: string;

    @Column({ name: 'connection_error', type: 'varchar', nullable: true })
    public error: string;

    @Column({ name: 'staff_id', type: 'int', nullable: true })
    public staffId: number;

    @ManyToOne(() => StaffEntity, (s) => s.wsConnections)
    @JoinColumn({ name: 'id' })
    public staff: StaffEntity;
}
