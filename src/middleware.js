import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isAllowedPath = ["/", "/register", "/login", "/invoice"].includes(path);

  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token && isAllowedPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!token && !isAllowedPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/admin:path*"],
};
