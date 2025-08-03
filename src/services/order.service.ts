import {Request, Response} from 'express';
import {getOrder} from '../controllers/order.controller.js';

const com = (req: Request, res: Response) => {
    try {
        getOrder(req.body).then(data => res.status(200).send(data)).catch(err => {
            console.error(err.message + '\n' + err.stack)
            res.status(502).send(null)
        })
    } catch (e) {
        console.error(e);
    }
}