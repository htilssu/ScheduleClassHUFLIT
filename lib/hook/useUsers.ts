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

export interface PaginatedResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UseUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

const fetchUsers = async ({ page = 1, limit = 10, search = "" }: UseUsersParams = {}): Promise<PaginatedResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
  });
  
  const response = await fetch(`/v1/admin/users?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const useUsers = (params?: UseUsersParams) => {
  return useQuery<PaginatedResponse, Error>({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}; 