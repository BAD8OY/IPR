import request from 'supertest';
import express from 'express';

import {orderRouter} from '../../routes/order.routes.js';
import {Order, orderSchemaCreateZod, orderSchemaUpdateZod} from "../../models/pg/order.model.js";
import {createOrder, getOrder, updateOrder, deleteOrder} from '../../services/order.service.js';
import {getUser} from "../../services/user.service.js";
import {IUser} from "../../models/mongo/user.model.js";

jest.mock('../../middlewares/auth.middleware.js', () => ({
    authorizationMiddleware: (req, res, next) => {
        if (req.headers.authorization === 'Bearer validtoken') {
            return next();
        }
        return res.status(401).send('Unauthorized');
    }
}));


jest.mock('../../middlewares/valid.middleware.js', () => ({
    validIdNumber: (req, res, next) => {
        if (!isNaN(Number(req.params.id))) {
            next();
        } else {
            res.status(400).send('Bad request');
        }
    },
    validOrderCreate: (req, res, next) => {
        if (orderSchemaCreateZod.safeParse(req.body).success) {
            next();
        } else {
            res.status(400).send('Bad request');
        }
    },
    validOrderUpdate: (req, res, next) => {
        if (orderSchemaUpdateZod.safeParse(req.body).success) {
            next();
        } else {
            res.status(400).send('Bad request');
        }
    }
}));

const mockedCreateOrder = jest.mocked(createOrder);
const mockedGetOrder = jest.mocked(getOrder);
const mockedUpdateOrder = jest.mocked(updateOrder);
const mockedDeleteOrder = jest.mocked(deleteOrder);
const mockedGetUser = jest.mocked(getUser);

jest.mock('../../services/order.service.js');
jest.mock('../../services/user.service.js');

const app = express();
app.use(express.json());
app.use(orderRouter);


beforeEach(() => {
    mockedCreateOrder.mockImplementation(
        async (userId: string, amount: number) => {
            return {
                id: 1,
                userId: userId,
                amount: amount,
                status: 'pending',
                createdAt: 'Data.now()'
            } as unknown as Order;
        }
    );

    mockedGetUser.mockImplementation(async (id) => {
        if (id === "68a62ece10e94b8d07ccbe1a") {
            return {
                _id: "68a62ece10e94b8d07ccbe1a",
                email: 'test@test.com',
                name: 'Vasya',
                profile: [
                    {
                        "_id": "6892568143b60098fbe12bd2"
                    }
                ],
                createdAt: '2025-08-06 18:31:55.277 +00:00',
                __v: 0
            } as unknown as IUser;
        }
        return null;
    });

    mockedGetOrder.mockImplementation(async (id) => {
        if (id === 1) {
            return {
                id: 1,
                userId: '689263d269d12bef18c33a4d',
                amount: '99',
                status: 'pending',
                createdAt: '2025-08-06 18:31:55.277 +00:00'
            } as unknown as Order;
        }
        return null;
    });

    mockedUpdateOrder.mockImplementation(async (id: number, data: Partial<Order>) => {
        if (id === 1) {
            return 1;
        }
        return null;
    });

    mockedDeleteOrder.mockImplementation(async (id) => {
        if (id === 1) {
            return true;
        }
        return null;
    });
});


describe('newOrder', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .post('/order');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 400 not valid amount', async () => {
        const res = await request(app)
            .post('/order')
            .set('Authorization', 'Bearer validtoken')
            .send({userId: '689263d269d12bef18c33a4d', amount: 'ffgasd'});
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should return 400 not found user', async () => {
        const res = await request(app)
            .post('/order')
            .set('Authorization', 'Bearer validtoken')
            .send({userId: '689263d269d12bef18c33a4d', amount: '99'});
        expect(res.status).toBe(400);
        expect(res.text).toBe('Not found user by Id');
    });

    it('should create order and return 201', async () => {
        const res = await request(app)
            .post('/order')
            .set('Authorization', 'Bearer validtoken')
            .send({userId: '68a62ece10e94b8d07ccbe1a', amount: '99'});
        expect(res.status).toBe(201);
        expect(res.text).toBe('{"id":1,"userId":"68a62ece10e94b8d07ccbe1a","amount":"99","status":"pending","createdAt":"Data.now()"}');
    });
});

describe('getOrderById', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .get('/orders/1');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 400 if id is not a number', async () => {
        const res = await request(app)
            .get('/orders/abc')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should return 404 if order not found', async () => {
        const res = await request(app)
            .get('/orders/99')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(404);
        expect(res.text).toBe('Not Found');
    });

    it('should return 200 and order if found', async () => {
        const res = await request(app)
            .get('/orders/1')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(200);
        expect(res.text).toBe('{"id":1,"userId":"689263d269d12bef18c33a4d","amount":"99","status":"pending","createdAt":"2025-08-06 18:31:55.277 +00:00"}');
    });
});

describe('updateOrderById', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .put('/orders/1');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 400 if id is not a number', async () => {
        const res = await request(app)
            .put('/orders/abc')
            .set('Authorization', 'Bearer validtoken')
            .send({userId: '689263d269d12bef18c33a4d', amount: '99'});
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should return 400 if data is invalid', async () => {
        const res = await request(app)
            .put('/orders/1')
            .set('Authorization', 'Bearer validtoken')
            .send({status: 'invalid'});
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should return 404 if order not found', async () => {
        const res = await request(app)
            .put('/orders/99')
            .set('Authorization', 'Bearer validtoken')
            .send({amount: '99'});
        expect(res.status).toBe(404);
        expect(res.text).toBe('Not Found');
    });

    it('should return 200 and updated order if found', async () => {
        const res = await request(app)
            .put('/orders/1')
            .set('Authorization', 'Bearer validtoken')
            .send({status: 'paid'});
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
});

describe('deleteOrderById', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .delete('/orders/1');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 400 if id is not a number', async () => {
        const res = await request(app)
            .delete('/orders/abc')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should return 404 if order not found', async () => {
        const res = await request(app)
            .delete('/orders/99')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(404);
        expect(res.text).toBe('Not Found');
    });

    it('should return 200 and deleted order if found', async () => {
        const res = await request(app)
            .delete('/orders/1')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(200);
        expect(res.text).toBe('true');
    });
});

describe('getOrdersWithFilter', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .get('/orders');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 200 and orders', async () => {
        const res = await request(app)
            .get('/orders')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(200);
        expect(res.text).toBe('');
    });
});