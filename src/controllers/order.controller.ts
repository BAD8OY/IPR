import {Order} from "../models/pg/order.model.js";


/**
 * POST /orders — создать заказ
 */
async function createOrder(userId, amount: number) {
    // const order = new Order();
    // order.userId = userId;
    // order.amount = amount;
    // order.status = 'pending';
    // order.createdAt = Date.now();
    await Order.create({userId: userId, amount: amount, status: "pending", createdAt: Date.now()});
}

/**
 * GET /orders/:id — получить заказ по id
 */
async function getOrder(id: number): Promise<Order> {
    return await Order.findByPk(id)
    // .then(data => data).catch(e => null);
}

/**
 * PUT /orders/:id — обновить заказ по id
 */
async function updateOrder(id: number) {
    return
}

/**
 * DELETE /orders/:id — удалить заказ
 */
async function deleteOrder(id: number): Promise<Order> {
    return
}

/**
 * GET /orders — получить список заказов (с фильтрацией по userId, пагинацией)
 */
async function getOrders(): Promise<Order[]> {
    return await Order.findAll();
}


export {createOrder, getOrder, updateOrder, deleteOrder, getOrders}