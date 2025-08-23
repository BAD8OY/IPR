import {Request, Response} from 'express';
import {createOrder, deleteOrder, getOrder, getOrders, updateOrder} from '../services/order.service.js';
import {getUser} from "../services/user.service.js";

const newOrder = async (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Orders']
    #swagger.description = 'new order'
    #swagger.parameters['Type step'] = {
        in: 'body',
        required: true,
        schema: { $ref: "#/definitions/Order" }
   }
    */
    try {
        const user = await getUser(req.body.userId);
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else if (user) {
            createOrder(req.body.userId, req.body.amount).then(data => res.status(201).send(data)).catch(err => {
                console.error(err.message + '\n' + err.stack)
                res.status(502).send(null)
            })
        }
    } catch (e) {
        console.error(e);
    }
}

const getOrderById = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Orders']
    #swagger.description = 'get order' */
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else if (isNaN(req.params.id)) {
            res.status(400).send('Bad request');
        } else {
            getOrder(req.params.id).then(data => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('Not Found');
                }
            }).catch(err => {
                console.error(err.message + '\n' + err.stack);
                res.status(502).send(null);
            });
        }
    } catch (e) {
        console.error(e);
    }
}

const updateOrderById = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Orders']
    #swagger.description = 'update order' */
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else if (isNaN(req.params.id)) {
            res.status(400).send('Bad request');
        } else {
            updateOrder(req.params.id, req.body).then(data => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('Not Found');
                }
            }).catch(err => {
                console.error(err.message + '\n' + err.stack)
                res.status(502).send(null)
            })
        }
    } catch (e) {
        console.error(e);
    }
}

const deleteOrderById = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Orders']
    #swagger.description = 'delete order' */
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else if (isNaN(req.params.id)) {
            res.status(400).send('Bad request');
        } else {
            deleteOrder(req.params.id).then(data => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('Not Found');
                }
            }).catch(err => {
                console.error(err.message + '\n' + err.stack)
                res.status(502).send(null)
            })
        }
    } catch (e) {
        console.error(e);
    }
}

const getOrdersWithFilter = (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Orders']
    #swagger.description = 'get orders'
    #swagger.security = [{
            "Bearer": []
    }] */
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
        } else {
            getOrders().then(data => res.status(200).send(data)).catch(err => {
                console.error(err.message + '\n' + err.stack)
                res.status(502).send(null)
            })
        }
    } catch (e) {
        console.error(e);
    }
}

export default {getOrderById, updateOrderById, newOrder, deleteOrderById, getOrdersWithFilter};