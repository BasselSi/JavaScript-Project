import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";
import Notes from "./Notes"; // Client component

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function PremiumPage() {
  const sessionCookie = cookies().get("session")?.value;
  let userId = null;

  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, SECRET);
      userId = payload?.userId;
    } catch {}
  }

  if (!userId) {
    return <div className="p-8 text-red-500">You must be logged in.</div>;
  }

  // Fetch notes for this user
  const notes = await prisma.note.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return <Notes initialNotes={notes} />;
}
