"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "super-secret-key-change-me"
);

export async function saveNoteAction(content) {
  const sessionCookie = (await cookies().get("session"))?.value;
  let userId = null;

  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, SECRET);
      userId = payload?.userId;
    } catch {}
  }

  if (!userId) {
    return { error: "You must be logged in." };
  }

  try {
    const note = await prisma.note.create({
      data: {
        content,
        userId,
      },
    });
    return { note };
  } catch {
    return { error: "Failed to save note." };
  }
}
