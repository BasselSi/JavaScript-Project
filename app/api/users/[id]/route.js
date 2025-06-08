import prisma from "@/prisma/user";
import { NextResponse } from "next/server";

// Get a single user by ID
export async function GET(request, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Update a single user by ID
export async function PATCH(request, { params }) {
  const { id } = params;
  const body = await request.json();
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: body,
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "User not found or update failed" },
      { status: 400 }
    );
  }
}

// Delete a single user by ID
export async function DELETE(request, { params }) {
  const { id } = params;
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
