import express from 'express';
import controller from "../controllers/order.controller.js";
import {authorizationMiddleware} from "../middlewares/auth.middleware.js";
import {validIdNumber, validOrderCreate, validOrderUpdate} from "../middlewares/valid.middleware.js";

const orderRouter = express.Router();

/**
 * @swagger
 * /order
 *      post:
 *          summary: создать заказ
 *          tags:
 *              - API по работе с заказами
 *          description: создает новый заказ
 *          parameters:
 *              - in: body
 *                name: message
 *                required: true
 *                description: объект message от телеграмм API.
 *                schema:
 *                 type: "object"
 *                 required:
 *
 *                 - userId
 *                 - amount
 *                 - status
 *                 - createdAt
 *                 properties:
 *                         userId:
 *                              type: string
 *                              example:
 *                         amount:
 *                              type: integer
 *                              example: 17
 *                         status:
 *                              type: string
 *                              example: pending
 *                         createdAt:
 *                              type: integer
 *                              example:
 *          responses:
 *              200:
 *                  description:
 *              500:
 *                  description: Internal server error
 */
orderRouter.post('/order', authorizationMiddleware, validOrderCreate, controller.newOrder);
orderRouter.get('/orders/:id', authorizationMiddleware, validIdNumber, controller.getOrderById);
orderRouter.put('/orders/:id', authorizationMiddleware, validIdNumber, validOrderUpdate, controller.updateOrderById);
orderRouter.delete('/orders/:id', authorizationMiddleware, validIdNumber, controller.deleteOrderById);
orderRouter.get('/orders', authorizationMiddleware, controller.getOrdersWithFilter);

export {orderRouter};