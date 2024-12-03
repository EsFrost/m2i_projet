"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoFull from "../../../public/logo_full.png";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isLogged = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLogged);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("tokenExpires");
        setIsLoggedIn(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-col items-center p-5 md:flex-row md:justify-between">
        <Link
          className="flex title-font font-medium items-center text-gray-900 justify-center"
          href="/"
        >
          <Image
            src={logoFull}
            width={0}
            height={0}
            sizes="100vw"
            alt="Site logo"
            className="max-w-[5rem] h-full"
          />
          <span className="hidden md:block text-xl">photoStockage</span>
        </Link>

        <nav className="flex flex-wrap items-center text-base mt-3 md:mt-0">
          <Link
            className="mr-5 hover:text-gray-900 bg-left-bottom bg-gradient-to-r from-[#4f46e5] to-[#d4d2f4] bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
            href="/"
          >
            Home
          </Link>
          <Link
            className="mr-5 hover:text-gray-900 bg-left-bottom bg-gradient-to-r from-[#4f46e5] to-[#d4d2f4] bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
            href="/about"
          >
            About
          </Link>
          <Link
            className="mr-5 hover:text-gray-900 bg-left-bottom bg-gradient-to-r from-[#4f46e5] to-[#d4d2f4] bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
            href="/contact"
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex justify-end ml-0">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center bg-red-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base mt-3 md:mt-0"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/signup">
                <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-3 md:mt-0">
                  Sign Up
                </button>
              </Link>
              <Link href="/login">
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-3 md:mt-0 ml-5 text-inherit">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
