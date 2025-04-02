'use client';

import React from 'react';
import { Card, Stack, Group, Title, Text, Button } from '@mantine/core';
import { Shield, Lock } from 'lucide-react';

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

interface AdditionalInfoProps {
    user: ExtendedUser;
    onPasswordChange: () => void;
}

const AdditionalInfo = ({ user, onPasswordChange }: AdditionalInfoProps) => (
    <Card shadow="sm" p="md" radius="md" withBorder>
        <Stack gap="md">
            <Title order={3}>Thông tin khác</Title>
            <Group className="bg-orange-50 p-3 rounded-lg">
                <Shield size={20} className="text-orange-500" />
                <div>
                    <Text size="sm" c="dimmed">Vai trò</Text>
                    <Text>{user.role || 'Chưa xác định'}</Text>
                </div>
            </Group>
            <Button 
                variant="light" 
                color="orange" 
                fullWidth
                leftSection={<Lock size={16} />}
                onClick={onPasswordChange}
            >
                Đổi mật khẩu
            </Button>
        </Stack>
    </Card>
);

export default AdditionalInfo; 