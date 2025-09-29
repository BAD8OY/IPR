import z from "zod";
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

const userSchemaCreateZod = z.object({
    email: z.email(),
    name: z.string(),
    profile: z.string().refine(
        (str) => {
            try {
                JSON.parse(str);
                return true;
            } catch {
                return false;
            }
        })
});

const userSchemaUpdateZod = z.object({
    email: z.email().optional(),
    name: z.string().optional(),
    profile: z.string().refine(
        (str) => {
            try {
                JSON.parse(str);
                return true;
            } catch {
                return false;
            }
        }).optional()
});

export {userSchemaCreateZod, userSchemaUpdateZod, User};