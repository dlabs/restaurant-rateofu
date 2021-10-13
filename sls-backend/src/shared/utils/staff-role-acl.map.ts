import { OrderItemStatus } from '../enums/order-item-status.enum';
import { ProductTypes } from '../enums/product-types.enum';
import { StaffRoles } from '../enums/staff-roles.enum';

export const staffRolesAclMap: Map<StaffRoles, { itemType: ProductTypes[]; itemStatus: OrderItemStatus[] }> = new Map([
    [StaffRoles.BARTENDER, { itemType: [ProductTypes.DRINK], itemStatus: [OrderItemStatus.IN_PROCESS, OrderItemStatus.READY] }],
    [StaffRoles.CHEF, { itemType: [ProductTypes.FOOD], itemStatus: [OrderItemStatus.IN_PROCESS, OrderItemStatus.READY] }],
]);
