'use client';

import React, { useState } from 'react';
import { Modal, Stack, PasswordInput, Button } from '@mantine/core';

interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ChangePasswordModalProps {
    opened: boolean;
    onClose: () => void;
}

const ChangePasswordModal = ({ opened, onClose }: ChangePasswordModalProps) => {
    const [formData, setFormData] = useState<PasswordFormData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement password change API call
        console.log('Changing password:', formData);
        onClose();
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
                        required
                    />
                    <PasswordInput
                        label="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        required
                    />
                    <PasswordInput
                        label="Xác nhận mật khẩu mới"
                        placeholder="Nhập lại mật khẩu mới"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                    />
                    <Button type="submit" color="orange" fullWidth>
                        Đổi mật khẩu
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default ChangePasswordModal; 