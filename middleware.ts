import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('authToken')?.value; // Adjust based on your auth strategy

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.role || !['admin', 'user'].includes(payload.role)) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
    matcher: '/project/:path*',
};
