import prisma from "@/prisma/user";
import { z } from "zod";
import { NextResponse } from "next/server";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name must not be longer than 20 characters"),
  //   email: z.string().email("Invalid email format"),
});

export async function POST(request) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      //   email: body.email,
    },
  });
  return NextResponse.json(
    { ...newUser, message: "User created successfully" },
    { status: 201 }
  );
}
