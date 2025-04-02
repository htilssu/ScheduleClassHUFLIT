'use client';

import React, { useState } from 'react';
import { Modal, Stack, PasswordInput, Button, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';

interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface PasswordErrors {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

interface ChangePasswordModalProps {
    opened: boolean;
    onClose: () => void;
    onSubmit: (data: { currentPassword: string; newPassword: string }) => Promise<{ success: boolean; message?: string }>;
}

const ChangePasswordModal = ({ opened, onClose, onSubmit }: ChangePasswordModalProps) => {
    const [formData, setFormData] = useState<PasswordFormData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<PasswordErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: PasswordErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await onSubmit({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            if (result.success) {
                // Reset form on success
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setErrors({});
                onClose();
            } else {
                // Hiển thị lỗi từ server
                setErrors({
                    currentPassword: result.message
                });
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setErrors({
                currentPassword: 'Có lỗi xảy ra khi đổi mật khẩu'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Đổi mật khẩu" size="md">
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <PasswordInput
                        label="Mật khẩu hiện tại"
                        placeholder="Nhập mật khẩu hiện tại"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                        error={errors.currentPassword}
                        required
                    />
                    <PasswordInput
                        label="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        error={errors.newPassword}
                        required
                    />
                    <PasswordInput
                        label="Xác nhận mật khẩu mới"
                        placeholder="Nhập lại mật khẩu mới"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        error={errors.confirmPassword}
                        required
                    />
                    <Text size="sm" c="dimmed">
                        Mật khẩu phải có ít nhất 6 ký tự
                    </Text>
                    <Button 
                        type="submit" 
                        color="orange" 
                        fullWidth
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Đổi mật khẩu
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default ChangePasswordModal; 