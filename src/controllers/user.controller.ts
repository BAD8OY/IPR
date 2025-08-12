import {Request, Response} from 'express';
import {createUser, deleteUser, getUser, getUsers, updateUser} from '../services/user.service.js';

const newUser = (req: Request, res: Response) => {
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
    try {
        getUser(req.params.id).then(data => {
            if (data) {
                res.status(200).send(data);
            }
            else {
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

const updateUserById = (req: Request, res: Response) => {
    try {
        updateUser(req.params.id, req.body).then(data => {
            if (data) {
                res.status(200).send(data);
            }
            else {
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
    try {
        deleteUser(req.params.id).then(data => {
            if (data) {
                res.status(200).send(data);
            }
            else {
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
