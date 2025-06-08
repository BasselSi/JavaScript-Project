"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the name to your API
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName(""); // Clear input after submit
    alert("User added successfully!"); // Notify user
    router.push("/users/"); // Redirect to users page
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter user name"
          className="input input-bordered w-full max-w-xs mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
    </div>
  );
};

export default NewUserPage;
