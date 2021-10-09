import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ProductTypes } from 'src/shared/enums/product-types.enum';

@Entity({ schema: 'public', name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    public name: string;

    @Column({ name: 'type', type: 'enum', nullable: false, enum: ['food', 'drink'] })
    public type: ProductTypes;

    @Column({ name: 'price', type: 'money', nullable: false })
    public price: string;

    public orderItems?: any; // any to avoid circular dependency

    public getFloatPrice() {
        return parseFloat(this.price.replace('$', ''));
    }
}
