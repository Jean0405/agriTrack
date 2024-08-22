import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import { Parcel } from './parcelModel'

interface CropAttributes {
    crop_id: number
    parcel_id: number
    crop_type: string
    area: number
}

interface CropCreationAttributes extends Optional<CropAttributes, 'crop_id'> {}

export const Crop = sequelize.define<
    Model<CropAttributes, CropCreationAttributes>
>(
    'Crop',
    {
        crop_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        parcel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'parcels',
                key: 'parcel_id',
            },
        },
        crop_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        area: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'crops',
        timestamps: false,
    }
)

// A parcel has many crops
Parcel.hasMany(Crop, {
    foreignKey: 'parcel_id', // This is the parcel_id in the crops table
    as: 'crops', // This is the alias for the relationship
})

// A crop belongs to a parcel
Crop.belongsTo(Parcel, {
    foreignKey: 'parcel_id', // This is the parcel_id in the crops table
    as: 'parcel', // This is the alias for the relationship
})
