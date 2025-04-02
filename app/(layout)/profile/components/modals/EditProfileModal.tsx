'use client';

import React, { useState } from 'react';
import { Modal, Stack, TextInput, Textarea, Button } from '@mantine/core';
import { updateUserProfile } from '@/app/actions/user-actions';
import { notifications } from '@mantine/notifications';
import { User } from '@/lib/state/user';

interface EditFormData {
    name: string;
    username: string;
}

interface EditProfileModalProps {
    opened: boolean;
    onClose: () => void;
    user: User;
    onSubmit: (data: User) => void;
}

const EditProfileModal = ({ opened, onClose, user, onSubmit }: EditProfileModalProps) => {
    const [formData, setFormData] = useState<EditFormData>({
        name: user.name || '',
        username: user.username || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await updateUserProfile(formData);
            if (result.success && result.user) {
                notifications.show({
                    title: 'Thành công',
                    message: 'Cập nhật thông tin thành công',
                    color: 'green',
                });
                onSubmit(result.user as any);
                onClose();
            } else {
                notifications.show({
                    title: 'Lỗi',
                    message: result.message || 'Có lỗi xảy ra khi cập nhật thông tin',
                    color: 'red',
                });
            }
        } catch (error) {
            notifications.show({
                title: 'Lỗi',
                message: 'Có lỗi xảy ra khi cập nhật thông tin',
                color: 'red',
            });
        }
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
                        label="Tên đăng nhập"
                        placeholder="Nhập tên đăng nhập"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
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