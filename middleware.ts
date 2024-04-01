import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {jwtVerify} from 'jose'

export async function middleware(request: NextRequest) {
    let cookie = request.cookies.get('token')
    if (!cookie || cookie.value.length === 0) {
        return NextResponse.redirect(new URL('/auth?reset=true', request.url))
    }


    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
        const verified = await jwtVerify(cookie.value, secret, {
            algorithms: ['HS256']
        });
        return NextResponse.next()
    } catch (e) {
        return NextResponse.redirect(new URL('/auth?reset=true', request.url))

    }
}

export const config = {
    matcher: '/((?!api/auth|auth|_next|image|favicon.ico).*)',
}
