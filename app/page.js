import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "super-secret-key-change-me"
);

export default async function HomePage() {
  // Get the session token from cookies
  const sessionCookie = (await cookies().get("session"))?.value;

  let userName = "Guest";
  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, SECRET);
      if (payload?.userId) {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
        });
        if (user) {
          userName = user.name;
        }
      }
    } catch {
      // Invalid token, keep userName as "Guest"
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Hello, {userName}</h1>
    </main>
  );
}
