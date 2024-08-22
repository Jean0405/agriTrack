import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import { User } from './userModel'

interface ParcelAttributes {
    parcel_id: number
    user_id: number
    name: string
    size: number
}

interface ParcelCreationAttributes
    extends Optional<ParcelAttributes, 'parcel_id'> {}

export const Parcel = sequelize.define<
    Model<ParcelAttributes, ParcelCreationAttributes>
>(
    'Parcel',
    {
        parcel_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'user_id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'parcels',
        timestamps: false,
    }
)

// A user has many parcels
User.hasMany(Parcel, {
    foreignKey: 'user_id', // This is the user_id in the parcels table
    as: 'parcels', // This is the alias for the relationship
})

// A parcel belongs to a user
Parcel.belongsTo(User, {
    foreignKey: 'user_id', // This is the user_id in the parcels table
    as: 'user', // This is the alias for the relationship
})
