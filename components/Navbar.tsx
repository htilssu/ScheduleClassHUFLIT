"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Avatar, Menu, Button } from "@mantine/core";
import { User, LogOut } from "lucide-react";
import Logo from "../public/images/LogoT&H1.png";
import Image from "next/image";

const Navbar = () => {
  const [mobileMenuOpen, setmMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={Logo} alt="Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-orange-500">
                SCHEDULE
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/"
                    ? "text-orange-500 bg-orange-50"
                    : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                Trang chủ
              </Link>
              <Link
                href="/schedule"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/schedule"
                    ? "text-orange-500 bg-orange-50"
                    : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                Lịch học
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/about"
                    ? "text-orange-500 bg-orange-50"
                    : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                Giới thiệu
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0">
            {status === "loading" ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
            ) : session ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar
                    src={session.user?.image}
                    alt={session.user?.name || ""}
                    radius="xl"
                    size="md"
                    className="cursor-pointer"
                  >
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user?.name}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </Menu.Label>
                  <Menu.Divider />
                  <Menu.Item
                    component={Link}
                    href="/profile"
                    leftSection={<User size={14} />}
                  >
                    Hồ sơ
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={<LogOut size={14} />}
                    onClick={handleSignOut}
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Link href="/auth">
                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
