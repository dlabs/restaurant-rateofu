import { addNewOrder } from './orders';
import mongoose from 'mongoose';
import MenuItem from '../models/menu-item';
import Order from '../models/order';
import OrderItem from '../models/order-item';

describe('Order Services', function () {
    describe('Adding a new order', function () {
        // Mock relevant mongoose functions
        let findMenuItemByIdSpy: jest.SpyInstance,
            createOrderSpy: jest.SpyInstance,
            createOrderItemSpy: jest.SpyInstance;

        beforeEach(function () {
            findMenuItemByIdSpy = jest
                .spyOn(MenuItem, 'findById')
                .mockResolvedValue({
                    itemTitle: 'test-item',
                    itemPrice: 1,
                    itemDescription: '',
                    itemType: 'food',
                    itemImage: '',
                });

            createOrderSpy = jest
                .spyOn(Order, 'create')
                .mockImplementation(() =>
                    Promise.resolve({ _id: new mongoose.Types.ObjectId() })
                );

            createOrderItemSpy = jest
                .spyOn(OrderItem, 'create')
                .mockImplementation(() =>
                    Promise.resolve({
                        _id: new mongoose.Types.ObjectId(),
                        itemId: 'test',
                        itemStatus: 'ordered',
                    })
                );
        });

        afterEach(function () {
            findMenuItemByIdSpy.mockRestore();
            createOrderSpy.mockRestore();
            createOrderItemSpy.mockRestore();
        });

        it('should create an order item for each unit', async function () {
            // Arrange
            const orderRequestBody = {
                tableId: 'test-table',
                items: [{ itemId: new mongoose.Types.ObjectId(), quantity: 2 }],
            };

            // Act
            const newOrder = await addNewOrder(orderRequestBody);

            // Assert
            expect(newOrder.orderItems).toHaveLength(2);
        });

        it('should sum prices of an order and display total price', async function () {
            // Arrange
            const orderRequestBody = {
                tableId: 'test-table',
                items: [{ itemId: new mongoose.Types.ObjectId(), quantity: 2 }],
            };

            // Act
            const newOrder = await addNewOrder(orderRequestBody);

            // Assert
            expect(newOrder.orderTotal).toBe(2);
        });
    });
});
