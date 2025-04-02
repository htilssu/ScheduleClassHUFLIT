export interface ExtendedUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    createdAt?: string;
    role?: string;
    phone?: string;
    address?: string;
    status?: 'active' | 'inactive';
    username?: string;
}

export interface EditFormData {
    name: string;
    phone: string;
    address: string;
}

export interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
} 