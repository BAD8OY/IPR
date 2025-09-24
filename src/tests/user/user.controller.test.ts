import { Request, Response } from 'express';

import controller from '../../controllers/user.controller.js';
import * as userService from '../../services/user.service.js';

jest.mock('../../services/user.service.js');

const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    json: jest.fn().mockReturnValue(res);
    return res as Response;
};

describe('user.controller', () => {
    let req: Partial<Request>;
    let res: Response;

    beforeEach(() => {
        req = {};
        res = mockResponse();
        jest.clearAllMocks();
    });

    describe('newUser', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            await controller.newUser(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should create user and return 201', async () => {
            req.user = { id: '1' };
            req.body = { email: 'test@test.com', name: 'Test', profile: '{}' };
            (userService.createUser as jest.Mock).mockResolvedValue({ id: '1' });
            await controller.newUser(req as Request, res);
            expect(userService.createUser).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('getUserById', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            await controller.getUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should return 400 if id is invalid', async () => {
            req.user = { id: '1' };
            req.params = { id: 'invalid' };
            await controller.getUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Not valid id');
        });

        it('should return 404 if user not found', async () => {
            req.user = { id: '1' };
            req.params = { id: '507f1f77bcf86cd799439011' };
            (userService.getUser as jest.Mock).mockResolvedValue(null);
            await controller.getUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Not Found');
        });

        it('should return 200 and user if found', async () => {
            req.user = { id: '1' };
            req.params = { id: '507f1f77bcf86cd799439011' };
            (userService.getUser as jest.Mock).mockResolvedValue({ id: '1' });
            await controller.getUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('updateUserById', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            await controller.updateUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should return 400 if id is invalid', async () => {
            req.user = { id: '1' };
            req.params = { id: 'invalid' };
            await controller.updateUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Not valid id');
        });

        it('should return 404 if user not found', async () => {
            req.user = { id: '1' };
            req.params = { id: '507f1f77bcf86cd799439011' };
            req.body = {};
            (userService.updateUser as jest.Mock).mockResolvedValue(null);
            await controller.updateUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Not Found');
        });

        it('should return 200 and updated user if found', async () => {
            req.user = { id: '1' };
            req.params = { id: '507f1f77bcf86cd799439011' };
            req.body = {};
            (userService.updateUser as jest.Mock).mockResolvedValue({ id: '1', name: 'Updated' });
            await controller.updateUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ id: '1', name: 'Updated' });
        });
    });

    describe('deleteUserById', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            await controller.deleteUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should return 400 if id is invalid', async () => {
            req.user = { id: '1' };
            req.params = { id: 'invalid' };
            await controller.deleteUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Not valid id');
        });

        it('should return 404 if user not found', async () => {
            req.user = { id: '1' };
            req.params = { id: '507f1f77bcf86cd799439011' };
            (userService.deleteUser as jest.Mock).mockResolvedValue(null);
            await controller.deleteUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Not Found');
        });

        it('should return 200 and deleted user if found', async () => {
            req.user = { id: '1' };
            req.params = { id: '507f1f77bcf86cd799439011' };
            (userService.deleteUser as jest.Mock).mockResolvedValue({ id: '1' });
            await controller.deleteUserById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('getUserWithFilter', () => {
        it('should return 401 if not authorized', async () => {
            req.user = undefined;
            await controller.getUserWithFilter(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized');
        });

        it('should return 200 and users', async () => {
            req.user = { id: '1' };
            (userService.getUsers as jest.Mock).mockResolvedValue([{ id: '1' }, { id: '2' }]);
            await controller.getUserWithFilter(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith([{ id: '1' }, { id: '2' }]);
        });
    });
});