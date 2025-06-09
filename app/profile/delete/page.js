"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DeleteUserPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) throw new Error("Failed to fetch user");
        const user = await res.json();
        setUsername(user.name);
      } catch {
        alert("User not found or not logged in.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/users/me", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      alert("User deleted successfully!");
      console.log(`User ${username} deleted successfully.`);
      // Redirect to login page after deletion
      window.location.href = "/login";
    } catch {
      alert("Failed to delete user.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span>Are you sure you want to delete your profile?</span>
      <br />
      <span className="text-red-500">This action cannot be undone.</span>
      <button className="btn btn-error mt-4" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
