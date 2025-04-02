import { User } from '@/lib/state/user';

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