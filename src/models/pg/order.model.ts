import {Table, Column, Model, DataType, AutoIncrement, PrimaryKey} from 'sequelize-typescript';
import z from "zod";

type Status = 'pending' | 'paid' | 'canceled';

@Table({
    tableName: 'Order',
    timestamps: false, // добавляет поля createdAt и updatedAt
})
export class Order extends Model<Order> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    userId!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    amount!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    status!: Status;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: number;
}

const orderSchemaCreateZod = z.object({
    userId: z.string().regex(/^[a-f\d]{24}$/i), // MongoDB ObjectId
    amount: z.string().regex(/^\d+$/),
});

const orderSchemaUpdateZod = z.object({
    amount: z.string().regex(/^\d+$/).optional(),
    status: z.enum(['pending', 'paid', 'canceled']).optional(),
});

export {orderSchemaCreateZod, orderSchemaUpdateZod}