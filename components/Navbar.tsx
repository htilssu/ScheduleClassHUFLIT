"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Avatar, Menu, Button, Skeleton } from "@mantine/core";
import { User, LogOut } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { clearUser, AppDispatch } from "@/lib/state";
import useUser from "@/lib/hook/useUser";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Sử dụng hook useUser để tự động fetch và lấy dữ liệu người dùng
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
    // Dispatch action để clear user state trong redux
    dispatch(clearUser());
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/80 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/LogoT&H1.png"
                alt="Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="text-3xl font-bold text-orange-500">
                SCHEDULE
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
                Liên hệ
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0">
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
                    className="cursor-pointer"
                  >
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
