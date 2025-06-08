import prisma from "@/prisma/user";
import { NextResponse } from "next/server";

// Get all users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}

// Create a new user
export async function POST(request) {
  const body = await request.json();
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      // Add other fields as needed, e.g. email: body.email
    },
  });
  return NextResponse.json(
    { ...newUser, message: "User created successfully" },
    { status: 201 }
  );
}

// Delete a user by id (expects ?id= in query string)
export async function DELETE(request) {
  const { searchParams } = new URL(request.url, "http://localhost");
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json(
      { ...deletedUser, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "User not found or could not be deleted" },
      { status: 404 }
    );
  }
}

// Update users in bulk or by query (optional, not typical)
export async function PATCH(request) {
  // This is a placeholder. Usually PATCH is handled in [id]/route.js for a single user.
  return NextResponse.json(
    { error: "PATCH not implemented on this route" },
    { status: 405 }
  );
}
