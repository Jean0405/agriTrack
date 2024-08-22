import { Request, Response, NextFunction } from 'express'
import sequelize from '../config/database'

export const dbConnection = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Database connected and synchronized')
        next()
    } catch (err) {
        console.error('Unable to connect to the database:', err)
        res.status(500).send('Database connection error')
    }
}
