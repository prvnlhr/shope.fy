import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  const authPaths = ["/auth/signin", "/auth/signup"];

  // If the user is logged in and trying to access auth pages, redirect to home
  if (isLoggedIn && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/auth/signin", "/auth/signup"],
};
