import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "super-secret-key-change-me"
);

export async function DELETE(request, { params }) {
  const sessionCookie = (await cookies().get("session"))?.value;
  if (!sessionCookie) return new Response("Unauthorized", { status: 401 });

  try {
    const { payload } = await jwtVerify(sessionCookie, SECRET);
    if (!payload?.userId) return new Response("Unauthorized", { status: 401 });

    // Only allow deleting notes belonging to the user
    const note = await prisma.note.findUnique({
      where: { id: params.id },
    });
    if (!note || note.userId !== payload.userId) {
      return new Response("Forbidden", { status: 403 });
    }

    await prisma.note.delete({
      where: { id: params.id },
    });

    return new Response(null, { status: 204 });
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
}
