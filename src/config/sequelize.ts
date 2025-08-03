// import dotenv from 'dotenv';
import console from '../utils/logger.js'
import {Order} from '../models/pg/order.model.js';
import {Sequelize} from 'sequelize-typescript';

// dotenv.config();

const URL: string = process.env.PG_URL ? process.env.PG_URL : "postgresql://postgres:postgres@localhost:5432/orders";
const sequelize = new Sequelize(URL);


try {
    sequelize.addModels([Order]);
    await sequelize.sync();
    console.log('Connection has been established successfully.');
    // const orders = await Order.findAll();

    await getOrders();
} catch (error) {
    console.error(error);
}

async function getOrders() {
    const orders = await Order.findAll();
    console.log(JSON.stringify(orders, null, 2));
}

// sequelize.close()

export {sequelize}