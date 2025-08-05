import mongoose from 'mongoose';
import console from '../utils/logger.js'

const URL: string = process.env.MONGO_URL ? process.env.MONGO_URL : "mongodb://root:root@localhost:27017/users?authSource=admin"

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