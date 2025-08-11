import {Request, Response} from 'express';
import {createOrder, deleteOrder, getOrder, getOrders, updateOrder} from '../controllers/order.controller.js';
import {getUser} from "../controllers/user.controller.js";

const newOrder = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req.body.userId)
        if (user) {
            createOrder(req.body.userId, req.body.amount).then(data => res.status(200).send(data)).catch(err => {
                console.error(err.message + '\n' + err.stack)
                res.status(502).send(null)
            })
        }
    } catch (e) {
        console.error(e);
    }
}

const getOrderById = (req: Request, res: Response) => {
    try {
        getOrder(req.params.id).then(
            data => {
                if (data) {
                    res.status(200).send(data)
                } else {
                    res.status(404).send('Not Found')
                }
            }).catch(err => {
            console.error(err.message + '\n' + err.stack)
            res.status(502).send(null)
        })
    } catch (e) {
        console.error(e);
    }
}

const updateOrderById = (req: Request, res: Response) => {
    try {
        updateOrder(req.body).then(data => res.status(200).send(data)).catch(err => {
            console.error(err.message + '\n' + err.stack)
            res.status(502).send(null)
        })
    } catch (e) {
        console.error(e);
    }
}

const deleteOrderById = (req: Request, res: Response) => {
    try {
        deleteOrder(req.params.id).then(data => {
            if (data) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send('Not Found');
            }
        }).catch(err => {
            console.error(err.message + '\n' + err.stack)
            res.status(502).send(null)
        })
    } catch (e) {
        console.error(e);
    }
}

const getOrdersWithFilter = (req: Request, res: Response) => {
    try {
        getOrders().then(data => res.status(200).send(data)).catch(err => {
            console.error(err.message + '\n' + err.stack)
            res.status(502).send(null)
        })
    } catch (e) {
        console.error(e);
    }
}

export default {getOrderById, updateOrderById, newOrder, deleteOrderById, getOrdersWithFilter};