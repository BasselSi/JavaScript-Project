// "use client";
import React from "react";
import Link from "next/link";

const NavBar = () => {
  const links = [
    { label: "Home", href: "/", className: "btn btn-primary" },
    { label: "Free Page", href: "/free", className: "btn btn-secondary" },
    // { label: "Premium Page", href: "/premium", className: "btn btn-secondary" },
    { label: "Browse Users", href: "/users", className: "btn btn-secondary" },
  ];
  return (
    <nav className={"flex space-x-5 border p-2 bg-gray-100"}>
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
    </nav>
  );
};
export default NavBar;
