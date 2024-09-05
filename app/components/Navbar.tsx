import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-green-600 w-full">
      <div className="container mx-auto p-4 text-center text-white">
        <h1 className="font-bold text-2xl md:text-4xl ">Supa Smoothies</h1>
        <div className="flex flex-row justify-center space-x-3 mt-2">
          <Link
            href="/"
            className="hover:text-green-300 hover:underline transition"
          >
            Home
          </Link>
          <Link
            href="/create"
            className="hover:text-green-300 hover:underline transition"
          >
            Create New Smoothies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
