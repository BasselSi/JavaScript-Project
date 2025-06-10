import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "super-secret-key-change-me"
);

export async function POST(req) {
  const sessionCookie = (await cookies().get("session"))?.value;
  if (!sessionCookie) return new Response("Unauthorized", { status: 401 });

  try {
    const { payload } = await jwtVerify(sessionCookie, SECRET);
    if (!payload?.userId) return new Response("Unauthorized", { status: 401 });

    const { content } = await req.json();
    if (!content || typeof content !== "string") {
      return new Response("Invalid content", { status: 400 });
    }

    const note = await prisma.note.create({
      data: {
        content,
        userId: payload.userId,
      },
    });

    return Response.json(note);
  } catch (err) {
    return new Response("Unauthorized", { status: 401 });
  }
}

export async function GET() {
  // (Optional) Implement if you want to fetch notes via API
}
