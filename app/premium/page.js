import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "super-secret-key-change-me"
);

export default async function PremiumPage() {
  const sessionCookie = (await cookies().get("session"))?.value;
  let user = null;

  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, SECRET);
      if (payload?.userId) {
        user = await prisma.user.findUnique({
          where: { id: payload.userId },
        });
      }
    } catch {}
  }

  if (!user?.isPremium) {
    return (
      <div className="p-8 text-red-500">Access denied. Premium users only.</div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Welcome to the Premium Page!</h1>
      {/* Premium content here */}
    </div>
  );
}
