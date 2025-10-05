import {Order} from "../models/pg/order.model.js";


/**
 * POST /orders — создать заказ
 */
async function createOrder(userId: string, amount: number) {
    return await Order.create({userId: userId, amount: amount, status: "pending", createdAt: Date.now()});
}

/**
 * GET /orders/:id — получить заказ по id
 */
async function getOrder(id: number): Promise<Order> {
    return await Order.findByPk(id);
}

/**
 * PUT /orders/:id — обновить заказ по id
 */
async function updateOrder(id: number, updateData: Partial<Order>): Promise<number> {
    const [affectedCount] = await Order.update(updateData, {
        where: { id }
    });

    if (affectedCount === 0) {
        return null;
    }

    return affectedCount;
}

/**
 * DELETE /orders/:id — удалить заказ
 */
async function deleteOrder(id: number): Promise<boolean | null> {
    const order: Order = await getOrder(id);
    if (order) {
        await order.destroy();
        return true;
    }
    return null;
}

/**
 * GET /orders — получить список заказов (с фильтрацией по userId, пагинацией)
 */
async function getOrders(): Promise<Order[]> {
    return await Order.findAll();
}


export {createOrder, getOrder, updateOrder, deleteOrder, getOrders}