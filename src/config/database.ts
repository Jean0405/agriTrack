import { Sequelize } from 'sequelize'
import { env } from './env'

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    dialect: 'postgres',
})

export default sequelize
