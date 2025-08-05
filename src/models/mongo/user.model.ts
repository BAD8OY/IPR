import {Schema, model, Document} from 'mongoose';


interface IUser extends Document {
    email: string;
    name: string;
    profile: object;
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    email: String,
    name: String,
    profile: [{body: String, date: Date}],
    createdAt: {type: Date, default: () => new Date(Date.now())}
});


// Создаем модель
const User = model<IUser>('User', userSchema);

export default User;

