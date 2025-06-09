import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "super-secret-key-change-me"
);

export async function middleware(request) {
  const protectedRoutes = ["/", "/users", "/free", "/premium"];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const token = (await cookies().get("session"))?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (!payload?.userId) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/", "/users", "/free", "/premium"],
// };
