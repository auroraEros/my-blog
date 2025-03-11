import { NextResponse } from "next/server";
import { middlewareAuth } from "@/app/_utils/middlewareAuth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    const user = await middlewareAuth(req);

    if (user) return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req);

    if (!user) return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = { matcher: ["/profile/:path*", "/signin", "/signup"] };
