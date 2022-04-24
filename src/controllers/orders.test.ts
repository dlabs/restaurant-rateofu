import httpMock from 'node-mocks-http';

import { addNewOrderController } from './orders';
import * as orderServices from '../services/orders';

describe('Order Controllers', function () {
    describe('Adding a new order', function () {
        it('should be OK with code 201 for created orders', async function () {
            // Arrange
            const request = httpMock.createRequest({
                method: 'POST',
                url: '/api/orders',
                body: {
                    tableId: 'test-table',
                    items: ['test-item'],
                },
            });
            const response = httpMock.createResponse();

            jest.mock('../services/orders');
            const addNewOrderSpy = jest
                .spyOn(orderServices, 'addNewOrder')
                .mockResolvedValue(undefined);

            // Act
            await addNewOrderController(request, response);

            // Assert
            expect(response.statusCode).toBe(201);
            addNewOrderSpy.mockRestore();
        });

        it('should error and respond with code 400 for empty orders', async function () {
            // Arrange
            const request = httpMock.createRequest({
                method: 'POST',
                url: '/api/orders',
                body: {
                    tableId: 'test-table',
                    items: [],
                },
            });
            const response = httpMock.createResponse();

            // Act
            await addNewOrderController(request, response);

            // Assert
            expect(response.statusCode).toBe(400);
        });
    });
});
