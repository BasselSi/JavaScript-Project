"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DeleteUserPage({ params }) {
  // Unwrap params if it's a Promise (future-proof)
  const actualParams =
    typeof params.then === "function" ? React.use(params) : params;
  const id = actualParams.id;

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const user = await res.json();
        setUsername(user.name);
      } catch {
        alert("User not found.");
        router.push("/users");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, router]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      alert("User deleted successfully!");
      router.push("/users");
    } catch {
      alert("Failed to delete user.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span>
        Are you sure you want to delete user <b>{username}</b>?
      </span>
      <button className="btn btn-error mt-4" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
