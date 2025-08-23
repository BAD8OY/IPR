import {Table, Column, Model, DataType, AutoIncrement, PrimaryKey} from 'sequelize-typescript';

@Table({
    tableName: 'emp',
    timestamps: false,
})
export class Emp extends Model<Emp> {
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
    login!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

}