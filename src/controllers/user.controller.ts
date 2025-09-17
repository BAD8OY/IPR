import {Request, Response} from 'express';
import {createUser, deleteUser, getUser, getUserByEmail, getUsers, updateUser} from '../services/user.service.js';
import mongoose from "mongoose";

const newUser = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'new user'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else {
            let user = await getUserByEmail(req.body.email);
            if (user) {
                res.status(400).send('Пользователь с таким email уже существует');
                return;
            }
            createUser(req.body.email, req.body.name, req.body.profile).then(data => res.status(201).send(data)).catch(err => {
                console.error(err.message + '\n' + err.stack)
                res.status(502).send(null)
            })
        }
    } catch (e) {
        console.error(e);
    }
}

const getUserById = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'get user'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else if (mongoose.isValidObjectId(req.params.id)) {
            getUser(req.params.id).then(data => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('Not Found');
                }
            }).catch(err => {
                console.error(err.message + '\n' + err.stack);
                res.status(502).send(null);
            });
        } else {
            res.status(400).send('Not valid id');
        }
    } catch (e) {
        console.error(e);
    }
}

const updateUserById = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'update user'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else if (mongoose.isValidObjectId(req.params.id)) {
            updateUser(req.params.id, req.body).then(data => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('Not Found');
                }
            }).catch(err => {
                console.error(err.message + '\n' + err.stack);
                res.status(502).send(null);
            });
        } else {
            res.status(400).send('Not valid id');
        }
    } catch (e) {
        console.error(e);
    }
}

const deleteUserById = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'delete user'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else if (mongoose.isValidObjectId(req.params.id)) {
            deleteUser(req.params.id).then(data => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('Not Found');
                }
            }).catch(err => {
                console.error(err.message + '\n' + err.stack)
                res.status(502).send(null)
            });
        } else {
            res.status(400).send('Not valid id');
        }
    } catch (e) {
        console.error(e);
    }
}

const getUserWithFilter = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'get users'
    #swagger.security = [{
        "Bearer": []
    }] */
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else {
            getUsers().then(data => res.status(200).send(data)).catch(err => {
                console.error(err.message + '\n' + err.stack)
                res.status(502).send(null)
            })
        }
    } catch (e) {
        console.error(e);
    }
}

export default {newUser, getUserById, updateUserById, deleteUserById, getUserWithFilter};
