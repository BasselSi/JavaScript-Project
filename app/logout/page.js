"use client";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    fetch("/api/logout", { method: "POST" }).then(() => {
      window.location.href = "/login";
    });
  });

  console.log("User logged out successfully.");
  return <p>Logging out...</p>;
}
