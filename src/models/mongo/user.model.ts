// id (ObjectId, генерируется MongoDB)
// email (string, уникальный)
// name (string)
// profile (object, произвольная вложенная структура)
// createdAt (datetime)

import {Schema, model, Document} from 'mongoose';


interface IUser extends Document {
    // id: object;
    email: string;
    name: string;
    profile: object;
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    // id: Schema.Types.UUID,
    email: String,
    name: String,
    profile: [{body: String, date: Date}],
    createdAt: { type: Date, default: Date.now }
});


// Создаем модель
const User = model<IUser>('User', userSchema);

export default User;

