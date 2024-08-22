import 'dotenv/config'

function getEnv(variable: string): string {
    const value = process.env[variable]
    if (!value) {
        throw new Error(`Environment variable ${variable} is not defined`)
    }
    return value
}

export const env = {
    PORT: getEnv('PORT'),
    HOST: getEnv('HOST'),
    DB_USER: getEnv('DB_USER'),
    DB_PASSWORD: getEnv('DB_PASSWORD'),
    DB_HOST: getEnv('DB_HOST'),
    DB_NAME: getEnv('DB_NAME'),
    DB_PORT: getEnv('DB_PORT'),
}
