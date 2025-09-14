"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Menu,
  TextInput,
} from "@mantine/core";
import {
  Bell,
  HelpCircle,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  UserCog,
} from "lucide-react";
import useUser from "@/lib/hook/useUser";
import { signOut } from "next-auth/react";
import Image from "next/image";

export function AdminNavbar() {
  const { data: user, loading, error } = useUser();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Ở đây có thể thêm logic để chuyển đổi dark mode trong ứng dụng
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-gray-200 bg-white dark:bg-gray-800 h-16 z-50">
      <div className="flex h-full items-center justify-between px-4">
        <div className="shrink-0">
          <Link href="/admin" className="flex items-center space-x-2">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <span className="text-3xl font-bold bg-linear-to-r from-gray-700 via-orange-500 to-orange-300 bg-clip-text text-transparent">
              ADMIN
            </span>
          </Link>
        </div>

        <div className="hidden md:block flex-1 mx-8">
          <div className="relative w-full max-w-md">
            <TextInput
              placeholder="Tìm kiếm..."
              className="w-full"
              leftSection={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ActionIcon
            variant="subtle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </ActionIcon>

          <div className="relative">
            <ActionIcon
              variant="subtle"
              aria-label="Notifications"
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {notifications}
                </span>
              )}
            </ActionIcon>
          </div>

          <Divider orientation="vertical" className="h-6" />

          {loading && !user && !error ? (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
          ) : user ? (
            <Menu shadow="md" width={220} position="bottom-end">
              <Menu.Target>
                <button className="flex items-center gap-2 rounded-full hover:bg-muted/50 p-1 transition-colors">
                  <Avatar
                    src={user.image}
                    alt={user.name || ""}
                    radius="xl"
                    size="md"
                    className="cursor-pointer"
                  >
                    {user.name?.charAt(0).toUpperCase() || "A"}
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start text-sm">
                    <span className="font-medium">
                      {user.name || "Người dùng"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isAdmin ? "Quản trị viên" : "Người dùng"}
                    </span>
                  </div>
                </button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name || "Người dùng"}
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
                  leftSection={<User size={14} />}
                >
                  Hồ sơ
                </Menu.Item>
                {isAdmin && (
                  <>
                    <Menu.Item
                      component={Link}
                      href="/admin/settings"
                      leftSection={<Settings size={14} />}
                    >
                      Cài đặt hệ thống
                    </Menu.Item>
                    <Menu.Item
                      component={Link}
                      href="/admin/users"
                      leftSection={<UserCog size={14} />}
                    >
                      Quản lý người dùng
                    </Menu.Item>
                  </>
                )}
                <Menu.Item
                  component={Link}
                  href="/help"
                  leftSection={<HelpCircle size={14} />}
                >
                  Trợ giúp
                </Menu.Item>
                <Menu.Divider />
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
              <Button color="orange" variant="filled" radius="md">
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
