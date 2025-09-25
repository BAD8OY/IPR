import {Request, Response} from 'express';
import {createUser, deleteUser, getUser, getUserByEmail, getUsers, updateUser} from '../services/user.service.js';
import {IUser} from "../models/mongo/user.model.js";

const newUser = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'new user'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        const user = await getUserByEmail(req.body.email);
        if (user) {
            res.status(400).send('Пользователь с таким email уже существует');
            return;
        }
        const data = await createUser(req.body.email, req.body.name, req.body.profile);
        if (data) {
            res.status(201).send(data);
        }
    } catch (e) {
        console.error(e);
        res.status(502).send(null);
    }
}

const getUserById = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'get user'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        const data = await getUser(req.params.id);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (e) {
        console.error(e);
        res.status(502).send(null);
    }
}

const updateUserById = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'update user'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        const data: IUser = await updateUser(req.params.id, req.body);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (e) {
        console.error(e);
        res.status(502).send(null);
    }
}

const deleteUserById = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'delete user'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        const data: IUser = await deleteUser(req.params.id);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (e) {
        console.error(e);
        res.status(502).send(null);
    }
}

const getUserWithFilter = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'get users'
    #swagger.security = [{
        "Bearer": []
    }] */
    try {
        const data: IUser[] = await getUsers();
        res.status(200).send(data);
    } catch (e) {
        console.error(e);
        res.status(502).send(null);
    }
}

export default {newUser, getUserById, updateUserById, deleteUserById, getUserWithFilter};
