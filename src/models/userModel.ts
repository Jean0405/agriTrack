import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'

interface UserAttributes {
    user_id: number
    full_name: string
    identification_number: string
    contact_number?: string
    location?: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

export const User = sequelize.define<
    Model<UserAttributes, UserCreationAttributes>
>(
    'User',
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        identification_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        contact_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        timestamps: false,
    }
)
