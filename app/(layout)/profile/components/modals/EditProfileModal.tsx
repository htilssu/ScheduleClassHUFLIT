'use client';

import React, { useState } from 'react';
import {Modal, Stack, TextInput, Button, Alert} from '@mantine/core';
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
    const [errors, setErrors] = useState<{ name?: string; username?: string }>({});

    const validateForm = () => {
        const newErrors: { name?: string; username?: string } = {};
        const nameWords = formData.name.trim().split(/\s+/);
        const usernameRegex = /^[a-zA-Z0-9]{6,20}$/;

        if (nameWords.length < 2) {
            newErrors.name = 'Họ và tên phải có ít nhất 2 từ';
        }

        if (!usernameRegex.test(formData.username)) {
            newErrors.username = 'Tên đăng nhập chỉ gồm chữ cái và số, từ 6-20 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

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
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            setErrors({ ...errors, name: undefined });
                        }}
                        error={errors.name}
                        required
                    />
                    <TextInput
                        label="Tên đăng nhập"
                        placeholder="Nhập tên đăng nhập"
                        value={formData.username}
                        onChange={(e) => {
                            setFormData({ ...formData, username: e.target.value });
                            setErrors({ ...errors, username: undefined });
                        }}
                        error={errors.username}
                        required
                    />
                    <Alert color="yellow" >
                        Lưu ý: Họ và tên phải có ít nhất 2 từ. Tên đăng nhập chỉ gồm chữ cái và số, từ 6-20 ký tự.
                    </Alert>


                    <Button type="submit" color="orange" fullWidth>
                        Lưu thay đổi
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default EditProfileModal; 