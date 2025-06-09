"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "super-secret-key-change-me"
);

export async function setPremium() {
  const sessionCookie = (await cookies().get("session"))?.value;
  if (!sessionCookie) return { error: "Not authenticated" };

  try {
    const { payload } = await jwtVerify(sessionCookie, SECRET);
    if (!payload?.userId) return { error: "Invalid session" };

    await prisma.user.update({
      where: { id: payload.userId },
      data: {
        isPremium: true,
        premiumAt: new Date(), // Save the current date and time
      },
    });
    console.log(`User ${payload.userId} set to premium successfully.`);
    return { success: true };
  } catch {
    return { error: "Invalid session" };
  }
}
