import mongoose from 'mongoose';
import User from '../models/mongo/user.model.js';

const URL: string = process.env.MONGO_URL ? process.env.MONGO_URL : "mongodb://root:root@localhost:27017/users?authSource=admin"

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://root:root@localhost:27017/users?authSource=admin', {
            serverSelectionTimeoutMS: 5000 // Таймаут подключения
        });
        console.log('Успешное подключение к MongoDB');

        let users = await User.find({});
        console.log('Найдены пользователи:', users);
    } catch (error) {
        console.error('Ошибка подключения к MongoDB:', error);
    }
}
