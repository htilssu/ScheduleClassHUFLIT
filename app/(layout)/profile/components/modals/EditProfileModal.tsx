'use client';

import React, { useState } from 'react';
import { Modal, Stack, TextInput, Textarea, Button } from '@mantine/core';

interface ExtendedUser {
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

interface EditFormData {
    name: string;
    phone: string;
    address: string;
}

interface EditProfileModalProps {
    opened: boolean;
    onClose: () => void;
    user: ExtendedUser;
    onSubmit: (data: EditFormData) => void;
}

const EditProfileModal = ({ opened, onClose, user, onSubmit }: EditProfileModalProps) => {
    const [formData, setFormData] = useState<EditFormData>({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Chỉnh sửa thông tin" size="md">
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <TextInput
                        label="Họ và tên"
                        placeholder="Nhập họ và tên"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <TextInput
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Textarea
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    <Button type="submit" color="orange" fullWidth>
                        Lưu thay đổi
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default EditProfileModal; 