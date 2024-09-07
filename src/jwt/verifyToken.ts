import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import { env } from '../config/env';


interface CustomRequest extends Request {
    auth?: {
        id: string;
    };
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token not provided or invalid format' });
        return;
    }
    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(authorization, encoder.encode(env.JWT_SECRET));

        req.auth = {
            id: payload.id as string,
        };

        next();
    } catch {
        res.status(401).send({
            status: 401,
            errorInfo: { message: "Authentication error" },
        });
    }
};