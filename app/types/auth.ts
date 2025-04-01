export interface RegisterData {
  username: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    email?: string | null;
    name?: string | null;
  };
}
