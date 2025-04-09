import React from 'react';
import { Paper, Title, Text, Group, Grid, Badge, Avatar, Stack } from '@mantine/core';
import { IconUser, IconMail, IconId, IconCalendar } from '@tabler/icons-react';
import { User } from "@/lib/state/user";

interface AccountInfoProps {
  user: User;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => {
  return (
    <Paper withBorder p="md" radius="md">
      <Group>
        <Avatar size="lg" src={user.image || undefined} alt={user.name || user.username} />
        <Stack gap="xs">
          <Title order={3}>{user.name || user.username}</Title>
          <Group gap="xs">
            <Badge 
              color={user.role === 'ADMIN' ? 'red' : user.role === 'PREMIUM_USER' ? 'blue' : 'gray'}
              variant="light"
            >
              {user.role === 'ADMIN' ? 'Admin' : user.role === 'PREMIUM_USER' ? 'Premium User' : 'Default User'}
            </Badge>
            {user.isLocked && (
              <Badge color="red">Đang chờ xóa</Badge>
            )}
          </Group>
        </Stack>
      </Group>

      <Grid mt="md">
        <Grid.Col span={6}>
          <Group gap="xs">
            <IconUser size={16} />
            <Text size="sm">Tên đăng nhập: {user.username}</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group gap="xs">
            <IconMail size={16} />
            <Text size="sm">Email: {user.email}</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group gap="xs">
            <IconId size={16} />
            <Text size="sm">ID: {user.id}</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group gap="xs">
            <IconCalendar size={16} />
            <Text size="sm">Ngày tạo: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default AccountInfo; 