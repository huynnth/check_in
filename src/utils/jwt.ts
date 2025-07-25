import jwt from 'jsonwebtoken';

export function getToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
}