import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export { auth } from "@/lib/auth";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

/**
 * Kiểm tra quyền truy cập admin
 * @param session Session của người dùng
 * @returns true nếu có quyền admin, false nếu không
 */
function checkAdminAccess(session: any) {
  return session?.user && session.user.role === Role.ADMIN;
}

export default async function middleware(req: NextRequest) {
  const session = await auth();

  if (/admin/i.test(req.nextUrl.pathname)) {
    if (!checkAdminAccess(session)) {
      return NextResponse.redirect(new URL("/404", req.url));
    }
  }

  return NextResponse.next();
}
