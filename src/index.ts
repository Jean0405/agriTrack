import cors from 'cors'
import express from 'express'
import { env } from './config/env'
import { dbConnection } from './middlewares/dbConnection'

const app = express()

app.use(express.json())
app.use(cors())

app.use(dbConnection)

app.listen(env.PORT, () => {
    console.log(
        `⚡️[server]: Server is running at http://${env.HOST}:${env.PORT}`
    )
})
