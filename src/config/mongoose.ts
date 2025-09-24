import mongoose from 'mongoose';
import dotenv from "dotenv";
import console from '../utils/logger.js'

dotenv.config();

const URL: string = process.env.MONGO_URL;

async function connectToMongo() {
    try {
        await mongoose.connect(URL, {
            serverSelectionTimeoutMS: 5000 // Таймаут подключения
        });
        console.info('Успешное подключение к MongoDB');
    } catch (error) {
        console.error(error);
    }
}

export {connectToMongo}