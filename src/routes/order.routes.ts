// POST /orders — создать заказ
// GET /orders/:id — получить заказ по id
// PUT /orders/:id — обновить заказ
// DELETE /orders/:id — удалить заказ
// GET /orders — получить список заказов (с фильтрацией по userId, пагинацией)


import express from 'express';

import service from "../services/order.service.js";

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
orderRouter.post('/order', service.newOrder);
orderRouter.get('/orders/:id', service.getOrderById);
orderRouter.put('/orders/:id', service.updateOrderById);
orderRouter.delete('/orders/:id', service.deleteOrderById);
orderRouter.get('/orders', service.getOrdersWithFilter);

export {orderRouter};