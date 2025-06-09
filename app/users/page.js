"use client";
import Link from "next/link";
import { Table } from "@radix-ui/themes";
import { useEffect, useState } from "react";

async function fetchUsers() {
  const res = await fetch("/api/users", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSetPremium = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPremium: true }),
    });
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isPremium: true } : user
      )
    );
  };

  const handleAccessPremium = (user) => {
    if (user.isPremium) {
      window.location.href = `/premium?id=${user.id}`;
    } else {
      alert("This user does not have premium access.");
    }
  };

  return (
    <div>
      <Table.Root variant="surface" className="mb-6">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <tbody>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <span>{user.name}</span>
              </Table.Cell>
              <Table.Cell>
                <span>{user.email}</span>
              </Table.Cell>
              <Table.Cell>
                {user.isPremium ? "Premium User" : "User"}
              </Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  {user.isPremium && (
                    <button
                      type="button"
                      className="btn btn-info btn-xs"
                      onClick={() => handleAccessPremium(user)}
                    >
                      Access premium
                    </button>
                  )}
                  {!user.isPremium && (
                    <button
                      type="button"
                      className="btn btn-success btn-xs"
                      onClick={() => handleSetPremium(user.id)}
                    >
                      Get Premium
                    </button>
                  )}
                  <Link
                    href={`/users/delete/${user.id}`}
                    className="btn btn-danger btn-xs"
                    role="button"
                  >
                    Delete User
                  </Link>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </tbody>
      </Table.Root>
      <Link href="/users/new" className="btn btn-primary" role="button">
        Add User
      </Link>
    </div>
  );
}
