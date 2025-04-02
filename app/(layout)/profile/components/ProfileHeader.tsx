'use client';

import React from 'react';
import { Avatar, Text, Group, Stack, Title, Badge, ActionIcon, Tooltip } from '@mantine/core';
import { Camera, Share2, Download } from 'lucide-react';
import { User } from '@/lib/state/user';

const ProfileHeader = ({ user }: { user: User }) => (
    <Group justify="space-between" align="center">
        <Group>
            <Avatar src={user.image} size="xl" radius="xl" />
            <Stack gap={0}>
                <Title order={3}>{user.name}</Title>
                <Text c="dimmed">{user.email}</Text>
                <Badge color="orange" variant="light">
                    {user.role}
                </Badge>
            </Stack>
        </Group>
        <Group>
            <Tooltip label="Thay đổi ảnh đại diện">
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
);

export default ProfileHeader; 