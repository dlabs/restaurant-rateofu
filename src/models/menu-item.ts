import { Schema, model } from 'mongoose';
const { String, Number } = Schema.Types;

export interface IMenuItem {
    itemTitle: string;
    itemPrice: number;
    itemDescription: string;
    itemType: 'food' | 'drink';
    itemImage: string;
}

const MenuItemSchema = new Schema<IMenuItem>({
    itemTitle: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemDescription: { type: String, required: true },
    itemType: {
        type: String,
        enum: ['food', 'drink'],
        required: true,
    },
    itemImage: { type: String, required: true },
});

const MenuItem = model<IMenuItem>('Menu Item', MenuItemSchema);
export default MenuItem;
