
import jwt from 'jsonwebtoken';

export function getToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
        console.error('JWT xác thực thất bại:', err);
        return null;
    }
}
