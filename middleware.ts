import { NextRequest, NextResponse } from 'next/server';
import { useAuth } from './app/Hooks/AuthContextHook';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/project/:path*',
};
