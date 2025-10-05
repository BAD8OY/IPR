import request from 'supertest';
import express from 'express';
import mongoose from "mongoose";

import {userRouter} from '../../routes/user.routes.js';
import {IUser, userSchemaCreateZod, userSchemaUpdateZod} from "../../models/mongo/user.model.js";
import {createUser, deleteUser, getUser, updateUser} from "../../services/user.service";
import {Order} from "../../models/pg/order.model";


jest.mock('../../middlewares/auth.middleware.js', () => ({
    authorizationMiddleware: (req, res, next) => {
        if (req.headers.authorization === 'Bearer validtoken') {
            return next();
        }
        return res.status(401).send('Unauthorized');
    }
}));


jest.mock('../../middlewares/valid.middleware.js', () => ({
    validObjectId: (req, res, next) => {
        if (mongoose.isValidObjectId(req.params.id)) {
            next();
        } else {
            res.status(400).send('Bad request');
        }
    },
    validUserCreate: (req, res, next) => {
        if (userSchemaCreateZod.safeParse(req.body).success) {
            next();
        } else {
            res.status(400).send('Bad request');
        }
    },
    validUserUpdate: (req, res, next) => {
        if (userSchemaUpdateZod.safeParse(req.body).success) {
            next();
        } else {
            res.status(400).send('Bad request');
        }
    }
}));

const mockedCreateUser = jest.mocked(createUser);
const mockedGetUser = jest.mocked(getUser);
const mockedUpdateUser = jest.mocked(updateUser);
const mockedDeleteUser = jest.mocked(deleteUser);


jest.mock('../../services/user.service.js'); // как влияет?

const app = express();
app.use(express.json());
app.use(userRouter);


beforeEach(() => {
    mockedCreateUser.mockImplementation(
        async (email: string, name: string, profile: string) => {
            return {
                _id: "68a62ece10e94b8d07ccbe1a",
                email: email,
                name: name,
                profile: profile,
                createdAt: '2025-08-06 18:31:55.277 +00:00',
                __v: 0
            } as unknown as IUser;
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

    mockedUpdateUser.mockImplementation(async (id: string, data: Partial<IUser>) => {
        if (id === '68a62ece10e94b8d07ccbe1a') {
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

    mockedDeleteUser.mockImplementation(async (id) => {
        if (id === '68a62ece10e94b8d07ccbe1a') {
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
});


describe('newUser', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .post('/users');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 400 not valid data', async () => {
        const res = await request(app)
            .post('/users')
            .set('Authorization', 'Bearer validtoken')
            .send({email: 'test@test', name: 'Test', profile: '{}'});
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should create user and return 201', async () => {
        const res = await request(app)
            .post('/users')
            .set('Authorization', 'Bearer validtoken')
            .send({email: 'test@test.com', name: 'Test', profile: '{}'});
        expect(res.status).toBe(201);
    });
});

describe('getUserById', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .get('/users/689263d269d12bef18c33a4d');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 400 if id is invalid', async () => {
        const res = await request(app)
            .get('/users/1')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should return 404 if user not found', async () => {
        const res = await request(app)
            .get('/users/689263d269d12bef18c33a4d')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(404);
        expect(res.text).toBe('Not Found');
    });

    it('should return 200 and user if found', async () => {
        const res = await request(app)
            .get('/users/68a62ece10e94b8d07ccbe1a')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(200);
        expect(res.text).toBe('{"_id":"68a62ece10e94b8d07ccbe1a","email":"test@test.com","name":"Vasya","profile":[{"_id":"6892568143b60098fbe12bd2"}],"createdAt":"2025-08-06 18:31:55.277 +00:00","__v":0}');
    });
});

describe('updateUserById', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .put('/users/689263d269d12bef18c33a4d');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 400 if id is invalid', async () => {
        const res = await request(app)
            .put('/users/689263d269d12bef18c33a4')
            .set('Authorization', 'Bearer validtoken')
            .send({email: 'test@test.ru'});
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should return 400 if data is invalid', async () => {
        const res = await request(app)
            .put('/users/689263d269d12bef18c33a4d')
            .set('Authorization', 'Bearer validtoken')
            .send({email: 'test@test'});
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should return 404 if user not found', async () => {
        const res = await request(app)
            .put('/users/689263d269d12bef18c33a4d')
            .set('Authorization', 'Bearer validtoken')
            .send({email: 'test@test.ru'});
        expect(res.status).toBe(404);
        expect(res.text).toBe('Not Found');
    });

    it('should return 200 and updated user if found', async () => {
        const res = await request(app)
            .put('/users/68a62ece10e94b8d07ccbe1a')
            .set('Authorization', 'Bearer validtoken')
            .send({email: 'test@test.ru'});
        expect(res.status).toBe(200);
        expect(res.text).toBe('{"_id":"68a62ece10e94b8d07ccbe1a","email":"test@test.com","name":"Vasya","profile":[{"_id":"6892568143b60098fbe12bd2"}],"createdAt":"2025-08-06 18:31:55.277 +00:00","__v":0}');
    });
});

describe('deleteUserById', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .delete('/users/689263d269d12bef18c33a4d');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 400 if id is invalid', async () => {
        const res = await request(app)
            .delete('/users/689263d269d12bef18c33a4')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad request');
    });

    it('should return 404 if user not found', async () => {
        const res = await request(app)
            .delete('/users/689263d269d12bef18c33a4d')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(404);
        expect(res.text).toBe('Not Found');
    });

    it('should return 200 and deleted user if found', async () => {
        const res = await request(app)
            .delete('/users/68a62ece10e94b8d07ccbe1a')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(200);
        expect(res.text).toBe('{"_id":"68a62ece10e94b8d07ccbe1a","email":"test@test.com","name":"Vasya","profile":[{"_id":"6892568143b60098fbe12bd2"}],"createdAt":"2025-08-06 18:31:55.277 +00:00","__v":0}');
    });
});

describe('getUserWithFilter', () => {
    it('should return 401 if not authorized', async () => {
        const res = await request(app)
            .get('/users');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Unauthorized');
    });

    it('should return 200 and users', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', 'Bearer validtoken');
        expect(res.status).toBe(200);
        expect(res.text).toBe('');
    });
});
