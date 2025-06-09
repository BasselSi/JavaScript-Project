"use server";
import Link from "next/link";
import { Table } from "@radix-ui/themes";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/user";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "super-secret-key-change-me"
);

export default async function UsersPage() {
  // Get the session token from cookies
  const sessionCookie = (await cookies().get("session"))?.value;
  let user = null;

  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, SECRET);
      if (payload?.userId) {
        user = await prisma.user.findUnique({
          where: { id: payload.userId },
        });
      }
    } catch {
      // Invalid token, user stays null
    }
  }

  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-2xl mb-4">User</h1>
        <p>You are not logged in.</p>
      </div>
    );
  }

  // Format the premium purchase date if available
  let premiumText = null;
  if (user.isPremium) {
    const premiumDate = user.premiumAt;
    const formattedDate = premiumDate
      ? new Date(premiumDate).toLocaleString()
      : "Unknown date";
    premiumText = (
      <span className="text-green-600 font-semibold">
        You have made the payment for premium. Thank you!
        <br />
        Premium access granted on: {formattedDate}
      </span>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Your Details</h1>
      <Table.Root variant="surface" className="mb-6 w-auto">
        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Name</Table.RowHeaderCell>
            <Table.Cell>{user.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Email</Table.RowHeaderCell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Role</Table.RowHeaderCell>
            <Table.Cell>{user.isPremium ? "Premium User" : "User"}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <div className="flex gap-4 items-center">
        {user.isPremium ? (
          premiumText
        ) : (
          <Link href="/payment" className="btn btn-primary">
            Become a premium user
          </Link>
        )}
        <Link href="/profile/delete" className="btn btn-error">
          Delete Account
        </Link>
      </div>
    </div>
  );
}
