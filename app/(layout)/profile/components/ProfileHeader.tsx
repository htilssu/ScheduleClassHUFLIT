'use client';

import React from 'react';
import { Avatar, Text, Group, Stack, Title, Badge, ActionIcon, Tooltip } from '@mantine/core';
import { Camera, Share2, Download } from 'lucide-react';

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

const ProfileHeader = ({ user }: { user: ExtendedUser }) => (
    <Stack gap="md">
        <Group justify="space-between">
            <Group>
                <Avatar 
                    src={user.image || undefined} 
                    size={120} 
                    radius="xl" 
                    alt={user.name || ''}
                    className="border-4 border-orange-100"
                >
                    {user.name?.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                    <Title order={2} className="text-2xl font-bold">{user.name}</Title>
                    <Text c="dimmed" size="sm" className="text-gray-600">{user.email}</Text>
                    <Group gap="xs" mt="xs">
                        <Badge 
                            variant="light" 
                            color={user.status === 'inactive' ? 'red' : 'green'}
                            size="lg"
                        >
                            {user.status === 'inactive' ? 'Không hoạt động' : 'Đang hoạt động'}
                        </Badge>
                        <Badge variant="light" color="orange" size="lg">{user.role}</Badge>
                    </Group>
                </div>
            </Group>
            <Group>
                <Tooltip label="Chỉnh sửa ảnh đại diện">
                    <ActionIcon variant="light" color="orange" size="lg">
                        <Camera size={20} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Chia sẻ hồ sơ">
                    <ActionIcon variant="light" color="orange" size="lg">
                        <Share2 size={20} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Tải xuống hồ sơ">
                    <ActionIcon variant="light" color="orange" size="lg">
                        <Download size={20} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Group>
    </Stack>
);

export default ProfileHeader; 