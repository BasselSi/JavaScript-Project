import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "super-secret-key-change-me"
);

// Get the current user from session
export async function GET() {
  const sessionCookie = (await cookies().get("session"))?.value;
  if (!sessionCookie) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const { payload } = await jwtVerify(sessionCookie, SECRET);
    if (!payload?.userId) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { name: true, email: true, id: true },
    });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid session" }), {
      status: 401,
    });
  }
}

// Delete the current user from session
export async function DELETE() {
  const sessionCookie = (await cookies().get("session"))?.value;
  if (!sessionCookie) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const { payload } = await jwtVerify(sessionCookie, SECRET);
    if (!payload?.userId) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
      });
    }
    await prisma.user.delete({
      where: { id: payload.userId },
    });
    // Optionally clear the session cookie here
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid session" }), {
      status: 401,
    });
  }
}
