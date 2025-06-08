"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PremiumPage = () => {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    if (!userId) {
      router.replace("/"); // redirect if no user
      alert(
        "Access to this page is only allowed through the (Browse Users) page."
      );
      return;
    }
    // Fetch user info from API
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        if (user.isPremium) setAllowed(true);
        else router.replace("/");
      })
      .catch(() => router.replace("/"));
  }, [userId, router]);

  if (!allowed) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h3>Welcome to the premium content</h3>
    </div>
  );
};

export default PremiumPage;
