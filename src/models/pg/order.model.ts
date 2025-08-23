// id (integer, автоинкремент)
// userId (ObjectId, ссылка на пользователя из MongoDB)
// amount (number)
// status (string: 'pending' | 'paid' | 'canceled')
// createdAt (datetime)
import {Table, Column, Model, DataType, AutoIncrement, PrimaryKey} from 'sequelize-typescript';

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

// export default Order;