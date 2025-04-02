import { useQuery } from "@tanstack/react-query";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  username: string;
  password?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/v1/admin/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}; 