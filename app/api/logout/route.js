import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Logged out" },
    {
      status: 200,
      headers: {
        "Set-Cookie":
          "session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure",
      },
    }
  );
}
