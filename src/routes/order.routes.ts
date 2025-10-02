import express from 'express';
import controller from "../controllers/order.controller.js";
import {authorizationMiddleware} from "../middlewares/auth.middleware.js";
import {validIdNumber, validOrderCreate, validOrderUpdate} from "../middlewares/valid.middleware.js";

const orderRouter = express.Router();


orderRouter.post('/order', authorizationMiddleware, validOrderCreate, controller.newOrder);
orderRouter.get('/orders/:id', authorizationMiddleware, validIdNumber, controller.getOrderById);
orderRouter.put('/orders/:id', authorizationMiddleware, validIdNumber, validOrderUpdate, controller.updateOrderById);
orderRouter.delete('/orders/:id', authorizationMiddleware, validIdNumber, controller.deleteOrderById);
orderRouter.get('/orders', authorizationMiddleware, controller.getOrdersWithFilter);

export {orderRouter};