import {Schema, model, Document} from 'mongoose';

interface DocumentResult<T> extends Document {
    _doc: T;
}

export interface IUser extends DocumentResult<IUser> {
    _id: string
    email: string;
    name: string;
    profile: object;
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        index: true
    },
    name: String,
    profile: [{body: String, date: Date}],
    createdAt: {type: Date, default: () => new Date(Date.now())}
});

const User = model<IUser>('User', userSchema);

export default User;
