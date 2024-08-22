import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import { Harvest } from './harvestModel'

interface SaleAttributes {
    sale_id: number
    harvest_id: number
    sale_date: Date
    buyer: string
    price_per_ton: number
    fixed_payment_per_ton: number
    total_revenue: number
}

interface SaleCreationAttributes extends Optional<SaleAttributes, 'sale_id'> {}

export const Sale = sequelize.define<
    Model<SaleAttributes, SaleCreationAttributes>
>(
    'Sale',
    {
        sale_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        harvest_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Harvest,
                key: 'harvest_id',
            },
        },
        sale_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        buyer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price_per_ton: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fixed_payment_per_ton: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        total_revenue: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'sales',
        timestamps: false,
    }
)

// A Harvest has many sales
Harvest.hasMany(Sale, {
    foreignKey: 'harvest_id', // This is the harvest_id in the sales table
    as: 'sales', // This is the alias for the relationship
})

// A sale belongs to a harvest
Sale.belongsTo(Harvest, {
    foreignKey: 'harvest_id', // This is the harvest_id in the sales table
    as: 'harvest', // This is the alias for the relationship
})
