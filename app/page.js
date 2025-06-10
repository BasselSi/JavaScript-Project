import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function HomePage() {
  const sessionCookie = await cookies().get("session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  let userName = "Guest";
  let isAuthenticated = false;
  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, SECRET);
      if (payload?.userId) {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
        });
        if (user) {
          userName = user.name;
          isAuthenticated = true;
        }
      }
    } catch (error) {
      console.error("Session verification failed:", error);
      // If session verification fails, we treat the user as unauthenticated
      isAuthenticated = false;
      userName = "Guest";
      redirect("/login");
    }
  }

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Hello, {userName}</h1>
    </main>
  );
}
