import {Request, Response} from 'express';
import {createUser, deleteUser, getUser, getUsers, updateUser} from '../services/user.service.js';

const newUser = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'new user' */
    try {
        createUser(req.body.email, req.body.name, req.body.profile).then(data => res.status(201).send(data)).catch(err => {
            console.error(err.message + '\n' + err.stack)
            res.status(502).send(null)
        })
    } catch (e) {
        console.error(e);
    }
}

const getUserById = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'get user' */
    try {
        if (mongoose.isValidObjectId(req.params.id)) {
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
            res.status(400).send('Bad request');
        }
    } catch (e) {
        console.error(e);
    }
}

const updateUserById = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'update user' */
    try {
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
    } catch (e) {
        console.error(e);
    }
}

const deleteUserById = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'delete user' */
    try {
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
    } catch (e) {
        console.error(e);
    }
}

const getUserWithFilter = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'get users' */
    try {
        getUsers().then(data => res.status(200).send(data)).catch(err => {
            console.error(err.message + '\n' + err.stack)
            res.status(502).send(null)
        })
    } catch (e) {
        console.error(e);
    }
}

export default {newUser, getUserById, updateUserById, deleteUserById, getUserWithFilter};
