'use client';

import React from 'react';
import { Card, Stack, Group, Title, Text, Button } from '@mantine/core';
import { User, Mail, Calendar, Phone, MapPin, Edit } from 'lucide-react';

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

interface PersonalInfoProps {
    user: ExtendedUser;
    onEdit: () => void;
}

const PersonalInfo = ({ user, onEdit }: PersonalInfoProps) => (
    <Card shadow="sm" p="md" radius="md" withBorder>
        <Stack gap="md">
            <Group justify="space-between">
                <Title order={3}>Thông tin cá nhân</Title>
                <Button 
                    variant="light" 
                    color="orange" 
                    onClick={onEdit}
                >
                    <Group gap="xs">
                        <Edit size={16} />
                        <Text>Chỉnh sửa thông tin</Text>
                    </Group>
                </Button>
            </Group>
            <Stack gap="md">
                <Group className="bg-orange-50 p-3 rounded-lg">
                    <User size={20} className="text-orange-500" />
                    <div>
                        <Text size="sm" c="dimmed">Họ và tên</Text>
                        <Text>{user.name}</Text>
                    </div>
                </Group>
                <Group className="bg-orange-50 p-3 rounded-lg">
                    <Mail size={20} className="text-orange-500" />
                    <div>
                        <Text size="sm" c="dimmed">Email</Text>
                        <Text>{user.email}</Text>
                    </div>
                </Group>
                <Group className="bg-orange-50 p-3 rounded-lg">
                    <User size={20} className="text-orange-500" />
                    <div>
                        <Text size="sm" c="dimmed">Tên đăng nhập</Text>
                        <Text>{user.username}</Text>
                    </div>
                </Group>
                {user.phone && (
                    <Group className="bg-orange-50 p-3 rounded-lg">
                        <Phone size={20} className="text-orange-500" />
                        <div>
                            <Text size="sm" c="dimmed">Số điện thoại</Text>
                            <Text>{user.phone}</Text>
                        </div>
                    </Group>
                )}
                {user.address && (
                    <Group className="bg-orange-50 p-3 rounded-lg">
                        <MapPin size={20} className="text-orange-500" />
                        <div>
                            <Text size="sm" c="dimmed">Địa chỉ</Text>
                            <Text>{user.address}</Text>
                        </div>
                    </Group>
                )}
                {user.createdAt && (
                    <Group className="bg-orange-50 p-3 rounded-lg">
                        <Calendar size={20} className="text-orange-500" />
                        <div>
                            <Text size="sm" c="dimmed">Ngày tham gia</Text>
                            <Text>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</Text>
                        </div>
                    </Group>
                )}
            </Stack>
        </Stack>
    </Card>
);

export default PersonalInfo; 