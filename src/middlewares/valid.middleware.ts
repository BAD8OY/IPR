import {Request, Response, NextFunction} from 'express';
import mongoose from "mongoose";
import {orderSchemaCreateZod, orderSchemaUpdateZod} from "../models/pg/order.model.js";
import {userSchemaCreateZod, userSchemaUpdateZod} from "../models/mongo/user.model.js";

const validOrderCreate = async (req: Request, res: Response, next: NextFunction) => {
    if (orderSchemaCreateZod.safeParse(req.body).success) {
        next();
    } else {
        res.status(400).send('Bad request');
    }
};

const validOrderUpdate = async (req: Request, res: Response, next: NextFunction) => {
    if (orderSchemaUpdateZod.safeParse(req.body).success) {
        next();
    } else {
        res.status(400).send('Bad request');
    }
};

const validIdNumber = async (req: Request, res: Response, next: NextFunction) => {
    if (!isNaN(Number(req.params.id))) {
        next();
    } else {
        res.status(400).send('Bad request');
    }
};

const validUserCreate = async (req: Request, res: Response, next: NextFunction) => {
    if (userSchemaCreateZod.safeParse(req.body).success) {
        next();
    } else {
        res.status(400).send('Bad request');
    }
};

const validUserUpdate = async (req: Request, res: Response, next: NextFunction) => {
    if (userSchemaUpdateZod.safeParse(req.body).success) {
        next();
    } else {
        res.status(400).send('Bad request');
    }
};

const validObjectId = async (req: Request, res: Response, next: NextFunction) => {
    if (mongoose.isValidObjectId(req.params.id)) {
        next();
    } else {
        res.status(400).send('Bad request');
    }
};



export {validOrderCreate, validOrderUpdate, validIdNumber, validUserCreate, validUserUpdate, validObjectId};