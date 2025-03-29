import {auth} from "@/lib/auth";
import {NextRequest, NextResponse} from "next/server";

export {auth} from "@/lib/auth";

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}

export default async function middleware(req: NextRequest) {
    // const session = await auth()


    NextResponse.next()
}