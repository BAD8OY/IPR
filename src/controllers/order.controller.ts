import {Order} from "../models/pg/order.model";


/**
 * POST /orders — создать заказ
 */
async function createOrder(userId, amount: number) {
    const order = new Order();
    order.amount = amount;
    order.status = 'pending';
    order.createdAt = Date.now();
}

/**
 * GET /orders/:id — получить заказ по id
 */
async function getOrder(id) {

    return await Order.findOne();
}

/**
 * PUT /orders/:id — обновить заказ по id
 */
async function updateOrder(id) {

}

/**
 * DELETE /orders/:id — удалить заказ
 */
async function deleteOrder(id) {

}

/**
 * GET /orders — получить список заказов (с фильтрацией по userId, пагинацией)
 */
async function getOrders(id) {

    return await Order.findAll();
}


export {getOrder, updateOrder, deleteOrder, getOrders};