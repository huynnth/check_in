
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const publicPaths = ['/login'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Nếu đang truy cập route công khai thì cho phép
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Kiểm tra token trong cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
        // Chưa đăng nhập thì chuyển hướng về /login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Nếu đã có token, cho phép tiếp tục
    return NextResponse.next();
}

// Áp dụng middleware cho tất cả route
export const config = {
    matcher: ['/((?!_next|static|favicon.ico).*)'],
};
