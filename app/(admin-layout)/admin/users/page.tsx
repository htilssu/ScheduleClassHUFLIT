"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  PlusCircle,
  Trash2,
  Edit,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react";

const dummyUsers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    role: "Sinh viên",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "thib@example.com",
    role: "Giảng viên",
    status: "Hoạt động",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "vanc@example.com",
    role: "Sinh viên",
    status: "Bị khóa",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "thid@example.com",
    role: "Sinh viên",
    status: "Hoạt động",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "vane@example.com",
    role: "Quản trị viên",
    status: "Hoạt động",
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Quản lý người dùng
        </h1>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm người dùng
        </button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>
            Quản lý tất cả người dùng trong hệ thống
          </CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Tìm kiếm người dùng..."
              className="pl-8 h-9 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      ID
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Tên
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Email
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Vai trò
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Trạng thái
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">{user.id}</td>
                      <td className="p-4 align-middle">{user.name}</td>
                      <td className="p-4 align-middle">{user.email}</td>
                      <td className="p-4 align-middle">{user.role}</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center">
                          <span
                            className={`flex h-2 w-2 rounded-full mr-2 ${
                              user.status === "Hoạt động"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {user.status}
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex space-x-2">
                          <button className="inline-flex items-center justify-center rounded-md p-1 text-sm font-medium text-muted-foreground hover:bg-muted/50">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Chỉnh sửa</span>
                          </button>
                          <button className="inline-flex items-center justify-center rounded-md p-1 text-sm font-medium text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Xóa</span>
                          </button>
                          <button className="inline-flex items-center justify-center rounded-md p-1 text-sm font-medium text-muted-foreground hover:bg-muted/50">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Thêm</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-end p-4">
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background hover:bg-muted">
                  Trước
                </button>
                <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background bg-muted">
                  1
                </button>
                <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background hover:bg-muted">
                  2
                </button>
                <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background hover:bg-muted">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
