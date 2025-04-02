'use client';

import React from 'react';
import { Card, Stack, Group, Title, Text, Button } from '@mantine/core';
import { Shield, Lock } from 'lucide-react';
import { User } from '@/lib/state/user';

interface AdditionalInfoProps {
    user: User;
    onPasswordChange: () => void;
}

const AdditionalInfo = ({ user, onPasswordChange }: AdditionalInfoProps) => (
    <Card shadow="sm" p="md" radius="md" withBorder>
        <Stack gap="md">
            <Title order={3}>Thông tin bổ sung</Title>
            <Stack gap="md">
                <Group className="bg-orange-50 p-3 rounded-lg">
                    <Shield size={20} className="text-orange-500" />
                    <div>
                        <Text size="sm" c="dimmed">Trạng thái tài khoản</Text>
                        <Text>{user.status === 'inactive' ? 'Không hoạt động' : 'Đang hoạt động'}</Text>
                    </div>
                </Group>
                <Group className="bg-orange-50 p-3 rounded-lg">
                    <Lock size={20} className="text-orange-500" />
                    <div>
                        <Text size="sm" c="dimmed">Mật khẩu</Text>
                        <Text>********</Text>
                    </div>
                </Group>
            </Stack>
            <Button 
                variant="light" 
                color="orange" 
                onClick={onPasswordChange}
                fullWidth
            >
                <Group gap="xs">
                    <Lock size={16} />
                    <Text>Đổi mật khẩu</Text>
                </Group>
            </Button>
        </Stack>
    </Card>
);

export default AdditionalInfo; 