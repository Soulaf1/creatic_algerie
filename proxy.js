import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {
  const token = request.cookies.get("admin_token")?.value;

  // Si connecté et tente d'aller sur /admin/login
  if (
    request.nextUrl.pathname === "/admin/login" &&
    token
  ) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  // Si non connecté et va sur /admin/login
  if (
    request.nextUrl.pathname === "/admin/login" &&
    !token
  ) {
    return NextResponse.next();
  }

  // Toutes les autres pages admin nécessitent un token
  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};