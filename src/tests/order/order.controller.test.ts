import { Request, Response } from 'express';
import controller from '../../controllers/order.controller.js';
import * as orderService from '../../services/order.service.js';
import * as userService from '../../services/user.service.js';

jest.mock('../../services/order.service.js');
jest.mock('../../services/user.service.js');

const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as Response;
};

describe('order.controller', () => {
    let req: Partial<Request>;
    let res: Response;

    beforeEach(() => {
        req = {};
        res = mockResponse();
        jest.clearAllMocks();
    });

    describe('newOrder', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            req.body = { userId: '1', amount: 10 };
            (userService.getUser as jest.Mock).mockResolvedValue({ id: '1' });
            await controller.newOrder(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should create order and return 201', async () => {
            req.user = { id: '1' };
            req.body = { userId: '1', amount: 10 };
            (userService.getUser as jest.Mock).mockResolvedValue({ id: '1' });
            (orderService.createOrder as jest.Mock).mockResolvedValue({ id: 'order1' });
            await controller.newOrder(req as Request, res);
            expect(orderService.createOrder).toHaveBeenCalledWith('1', 10);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith({ id: 'order1' });
        });

        it('should handle createOrder error', async () => {
            req.user = { id: '1' };
            req.body = { userId: '1', amount: 10 };
            (userService.getUser as jest.Mock).mockResolvedValue({ id: '1' });
            (orderService.createOrder as jest.Mock).mockRejectedValue(new Error('fail'));
            await controller.newOrder(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(502);
            expect(res.send).toHaveBeenCalledWith(null);
        });
    });

    describe('getOrderById', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            req.params = { id: '1' };
            await controller.getOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should return 400 if id is not a number', async () => {
            req.user = { id: '1' };
            req.params = { id: 'abc' };
            await controller.getOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Bad request');
        });

        it('should return 404 if order not found', async () => {
            req.user = { id: '1' };
            req.params = { id: '2' };
            (orderService.getOrder as jest.Mock).mockResolvedValue(null);
            await controller.getOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Not Found');
        });

        it('should return 200 and order if found', async () => {
            req.user = { id: '1' };
            req.params = { id: '2' };
            (orderService.getOrder as jest.Mock).mockResolvedValue({ id: '2' });
            await controller.getOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ id: '2' });
        });

        it('should handle getOrder error', async () => {
            req.user = { id: '1' };
            req.params = { id: '2' };
            (orderService.getOrder as jest.Mock).mockRejectedValue(new Error('fail'));
            await controller.getOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(502);
            expect(res.send).toHaveBeenCalledWith(null);
        });
    });

    describe('updateOrderById', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            req.params = { id: '1' };
            await controller.updateOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should return 400 if id is not a number', async () => {
            req.user = { id: '1' };
            req.params = { id: 'abc' };
            await controller.updateOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Bad request');
        });

        it('should return 404 if order not found', async () => {
            req.user = { id: '1' };
            req.params = { id: '2' };
            req.body = {};
            (orderService.updateOrder as jest.Mock).mockResolvedValue(null);
            await controller.updateOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Not Found');
        });

        it('should return 200 and updated order if found', async () => {
            req.user = { id: '1' };
            req.params = { id: '2' };
            req.body = { amount: 20 };
            (orderService.updateOrder as jest.Mock).mockResolvedValue({ id: '2', amount: 20 });
            await controller.updateOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ id: '2', amount: 20 });
        });

        it('should handle updateOrder error', async () => {
            req.user = { id: '1' };
            req.params = { id: '2' };
            req.body = { amount: 20 };
            (orderService.updateOrder as jest.Mock).mockRejectedValue(new Error('fail'));
            await controller.updateOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(502);
            expect(res.send).toHaveBeenCalledWith(null);
        });
    });

    describe('deleteOrderById', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            req.params = { id: '1' };
            await controller.deleteOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should return 400 if id is not a number', async () => {
            req.user = { id: '1' };
            req.params = { id: 'abc' };
            await controller.deleteOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Bad request');
        });

        it('should return 404 if order not found', async () => {
            req.user = { id: '1' };
            req.params = { id: '2' };
            (orderService.deleteOrder as jest.Mock).mockResolvedValue(null);
            await controller.deleteOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Not Found');
        });

        it('should return 200 and deleted order if found', async () => {
            req.user = { id: '1' };
            req.params = { id: '2' };
            (orderService.deleteOrder as jest.Mock).mockResolvedValue({ id: '2' });
            await controller.deleteOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ id: '2' });
        });

        it('should handle deleteOrder error', async () => {
            req.user = { id: '1' };
            req.params = { id: '2' };
            (orderService.deleteOrder as jest.Mock).mockRejectedValue(new Error('fail'));
            await controller.deleteOrderById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(502);
            expect(res.send).toHaveBeenCalledWith(null);
        });
    });

    describe('getOrdersWithFilter', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            await controller.getOrdersWithFilter(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should return 200 and orders', async () => {
            req.user = { id: '1' };
            (orderService.getOrders as jest.Mock).mockResolvedValue([{ id: '1' }, { id: '2' }]);
            await controller.getOrdersWithFilter(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith([{ id: '1' }, { id: '2' }]);
        });

        it('should handle getOrders error', async () => {
            req.user = { id: '1' };
            (orderService.getOrders as jest.Mock).mockRejectedValue(new Error('fail'));
            await controller.getOrdersWithFilter(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(502);
            expect(res.send).toHaveBeenCalledWith(null);
        });
    });
});