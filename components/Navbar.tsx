"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Avatar, Menu, Button, Skeleton } from "@mantine/core";
import { User, LogOut, Shield } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { clearUser, AppDispatch } from "@/lib/state";
import useUser from "@/lib/hook/useUser";
import useAppConfig from "@/lib/hook/use-app-config";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const config = useAppConfig();
  const pathname = usePathname();

  const { data: user, loading: userLoading } = useUser();

  const dispatch = useDispatch<AppDispatch>();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    dispatch(clearUser());
    await signOut({ redirectTo: "/" });
  };

  return (
    <nav
      className={`fixed h-16 top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/80 shadow-xs`}
    >
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-full justify-between items-center">
          <div className="shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="text-3xl uppercase font-bold bg-linear-to-r from-gray-700 via-orange-500 to-orange-300 bg-clip-text text-transparent">
                {config.appName}
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/home"
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  pathname === "/home"
                    ? "text-orange-500 bg-orange-50/70"
                    : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
                }`}
              >
                Trang chủ
              </Link>
              <Link
                href="/schedule"
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  pathname === "/schedule"
                    ? "text-orange-500 bg-orange-50/70"
                    : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
                }`}
              >
                Lịch học
              </Link>
              <Link
                href="/direction"
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  pathname === "/direction"
                    ? "text-orange-500 bg-orange-50/70"
                    : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
                }`}
              >
                Hướng dẫn
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  pathname === "/contact"
                    ? "text-orange-500 bg-orange-50/70"
                    : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
                }`}
              >
                Giới thiệu
              </Link>
            </div>
          </div>

          <div className="shrink-0 hidden md:flex">
            {userLoading && user === null ? (
              <Skeleton height={40} circle />
            ) : user ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar
                    src={user.image || undefined}
                    alt={user.name || ""}
                    radius="xl"
                    size="md"
                    className="cursor-pointer rounded-full shadow-lg ring-1 ring-orange-400 transition duration-300"
                  >
                    {user.name?.charAt(0).toUpperCase() || "H"}
                  </Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </Menu.Label>
                  <Menu.Divider />
                  <Menu.Item
                    component={Link}
                    href="/profile"
                    leftSection={<User size={18} />}
                    className="text-base"
                  >
                    Hồ sơ
                  </Menu.Item>
                  {user.role === "ADMIN" && (
                    <Menu.Item
                      component={Link}
                      href="/admin"
                      leftSection={<Shield size={18} />}
                      className="text-base"
                    >
                      Trang Quản trị
                    </Menu.Item>
                  )}
                  <Menu.Item
                    color="red"
                    leftSection={<LogOut size={18} />}
                    onClick={handleSignOut}
                    className="text-base"
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Link href="/auth">
                <Button
                  color="orange"
                  variant="filled"
                  radius="md"
                  className="text-base"
                >
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50/70 focus:outline-hidden"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <Link
                href="/profile"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Avatar
                  src={user.image || undefined}
                  alt={user.name || ""}
                  radius="xl"
                  size="md"
                  className="mr-3"
                >
                  {user.name?.charAt(0).toUpperCase() || "H"}
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                </div>
              </Link>
            ) : (
              <Link
                href="/auth"
                className="block w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  color="orange"
                  variant="filled"
                  radius="md"
                  className="w-full text-base"
                >
                  Đăng nhập
                </Button>
              </Link>
            )}
            <Link
              href="/home"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/home"
                  ? "text-orange-500 bg-orange-50/70"
                  : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              href="/schedule"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/schedule"
                  ? "text-orange-500 bg-orange-50/70"
                  : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Lịch học
            </Link>
            <Link
              href="/direction"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/direction"
                  ? "text-orange-500 bg-orange-50/70"
                  : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Hướng dẫn
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/contact"
                  ? "text-orange-500 bg-orange-50/70"
                  : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Giới thiệu
            </Link>
            {user && (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50/70"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Trang Quản trị
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50/70"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
