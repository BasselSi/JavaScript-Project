import "server-only"; // Ensure this file is only used on the server side
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);

const COOKIE_NAME = "session";
const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7, // 1 week
  secure: process.env.NODE_ENV === "production",
};

export async function createSession(userId) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);

  cookies().set(COOKIE_NAME, token, COOKIE_OPTIONS);
  redirect("/"); // Redirect to home after setting the session
}

export async function verifySessionOrRedirect() {
  const token = (await cookies().get(COOKIE_NAME))?.value;
  if (!token) {
    redirect("/login");
  }
  try {
    const { payload } = await jwtVerify(token, SECRET);
    if (!payload?.userId) {
      redirect("/login");
    }
    return payload;
  } catch {
    redirect("/login");
  }
}

export async function deleteSession() {
  cookies().set(COOKIE_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 });
}
