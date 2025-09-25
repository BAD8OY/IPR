import {Request, Response} from 'express';
import {createOrder, deleteOrder, getOrder, getOrders, updateOrder} from '../services/order.service.js';
import {getUser} from "../services/user.service.js";
import {Order} from "../models/pg/order.model.js";
import {IUser} from "../models/mongo/user.model";

const newOrder = async (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Orders']
    #swagger.description = 'new order'
    #swagger.parameters['Type step'] = {
        in: 'body',
        required: true,
        schema: { $ref: "#/definitions/Order" }
    }
    #swagger.security = [{
            "Bearer": []
    }]
    */
    try {
        const user: IUser = await getUser(req.body.userId);
        if (user) {
            const data = await createOrder(req.body.userId, req.body.amount);
            res.status(201).send(data);
        } else {
            res.status(400).send('Not found user by Id');
        }
    } catch (e) {
        console.error(e);
        res.status(502).send(null);
    }
}

const getOrderById = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Orders']
    #swagger.description = 'get order'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        const data: Order = await getOrder(Number(req.params.id));
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

const updateOrderById = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Orders']
    #swagger.description = 'update order'
    #swagger.security = [{
        "Bearer": []
    }] */
    try {
        const data = await updateOrder(Number(req.params.id), req.body);
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

const deleteOrderById = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Orders']
    #swagger.description = 'delete order'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        const data: boolean = await deleteOrder(Number(req.params.id));
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

const getOrdersWithFilter = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Orders']
    #swagger.description = 'get orders'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        const data: Order[] = await getOrders();
        res.status(200).send(data);
    } catch (e) {
        console.error(e);
        res.status(502).send(null);
    }
}

export default {getOrderById, updateOrderById, newOrder, deleteOrderById, getOrdersWithFilter};