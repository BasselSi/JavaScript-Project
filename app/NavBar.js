"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const links = [
    { label: "Home", href: "/", className: "btn btn-primary" },
    { label: "Free Page", href: "/free", className: "btn btn-secondary" },
    // { label: "Premium Page", href: "/premium", className: "btn btn-secondary" },
    { label: "Browse Users", href: "/users", className: "btn btn-secondary" },
  ];

  return (
    <nav className="flex items-center justify-between border p-2 bg-gray-100">
      <div className="flex space-x-5">
        {links.map((link) => (
          <Link
            key={link.href}
            className={link.className}
            href={link.href}
            role="button"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <button
        className="btn btn-error ml-auto"
        onClick={() => router.push("/logout")}
        type="button"
      >
        Log out
      </button>
    </nav>
  );
};
export default NavBar;
