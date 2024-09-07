import { SignJWT } from "jose";
import { env } from "../config/env";

interface tokenPayload {
    id: string;
}

export const generateToken = async(tokenPayload: tokenPayload) => {
    const encoder = new TextEncoder();
    const jwt = await new SignJWT({tokenPayload})
    .setProtectedHeader({ alg: "HS256" , typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("3h")
    .sign(encoder.encode(env.JWT_SECRET));

    return jwt;
}