import {Sequelize} from 'sequelize-typescript';
import dotenv from 'dotenv';
import console from '../utils/logger.js'
import {Order} from '../models/pg/order.model.js';
import {Emp} from '../models/pg/emp.model.js';

dotenv.config();

const URL: string = process.env.PG_URL;
const sequelize = new Sequelize(URL);
sequelize.options.logging = false;


async function connectToPostgres() {
    try {
        sequelize.addModels([Order]);
        sequelize.addModels([Emp]);
        await sequelize.sync();
        console.info('Успешное подключение к PostgresDB');
    } catch (error) {
        console.error(error);
    }
}

export {connectToPostgres}