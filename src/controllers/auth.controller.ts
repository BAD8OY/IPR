import {Request, Response} from 'express';
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";

import {createEmp, getEmp} from '../services/auth.service.js';
import {Emp} from "../models/pg/emp.model.js";

dotenv.config();

const register = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Auth']
    #swagger.description = 'registration' */
    try {
        const data = await createEmp(req.body.login, req.body.password);
        if (data) {
            res.status(201).send(data);
        }
    } catch (e) {
        console.error(e);
        res.status(502).send(null);
    }
}

const login = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Auth']
    #swagger.description = 'Log in' */
    try {
        const data: Emp = await getEmp(req.body.login, req.body.password);
        if (data) {
            res.status(200).send({
                id: data.dataValues.id,
                login: data.dataValues.login,
                token: jwt.sign({id: data.dataValues.id}, process.env.TOKEN),
            });
        } else {
            res.status(418).send('Wrong login or password');
        }
    } catch (e) {
        console.error(e);
        res.status(502).send(null);
    }
}


export default {register, login};