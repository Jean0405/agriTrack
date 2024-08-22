import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import { Crop } from './cropModel'

interface HarvestAttributes {
    harvest_id: number
    crop_id: number
    harvest_date: Date
    quantity: number // toneladas
    quality: string
}

interface HarvestCreationAttributes
    extends Optional<HarvestAttributes, 'harvest_id'> {}

export const Harvest = sequelize.define<
    Model<HarvestAttributes, HarvestCreationAttributes>
>(
    'Harvest',
    {
        harvest_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        crop_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Crop,
                key: 'crop_id',
            },
        },
        harvest_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quality: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'harvests',
        timestamps: false,
    }
)

// Crop has many harvests
Crop.hasMany(Harvest, {
    foreignKey: 'crop_id', // This is the crop_id in the harvests table
    as: 'harvests', // This is the alias for the relationship
})

// A harvest belongs to a crop
Harvest.belongsTo(Crop, {
    foreignKey: 'crop_id', // This is the crop_id in the harvests table
    as: 'crop', // This is the alias for the relationship
})
