// POST /orders — создать заказ
// GET /orders/:id — получить заказ по id
// PUT /orders/:id — обновить заказ
// DELETE /orders/:id — удалить заказ
// GET /orders — получить список заказов (с фильтрацией по userId, пагинацией)


import express from 'express';

import controller from "../controllers/order.controller.js";

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
orderRouter.post('/order', controller.newOrder);
orderRouter.get('/orders/:id', controller.getOrderById);
orderRouter.put('/orders/:id', controller.updateOrderById);
orderRouter.delete('/orders/:id', controller.deleteOrderById);
orderRouter.get('/orders', controller.getOrdersWithFilter);

export {orderRouter};