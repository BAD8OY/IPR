// import dotenv from 'dotenv';
import console from '../utils/logger.js'
import {Order} from '../models/pg/order.model.js';
import {Sequelize} from 'sequelize-typescript';

// dotenv.config();

const URL: string = process.env.PG_URL ? process.env.PG_URL : "postgresql://postgres:postgres@localhost:5432/orders";
const sequelize = new Sequelize(URL);
sequelize.options.logging = false;
// sequelize.options.omitNull = true;


async function connectToPostgres() {
    try {
        sequelize.addModels([Order]);
        await sequelize.sync();
        console.info('Успешное подключение к PostgresDB');
    } catch (error) {
        console.error(error);
    }
}

export {connectToPostgres}