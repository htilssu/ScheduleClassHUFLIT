import React from 'react';
import { Paper, Title, Text, Stack, Group, Badge, ActionIcon, ScrollArea, Divider, Avatar } from '@mantine/core';
import { IconCheck, IconX, IconBell, IconCalendar, IconBook, IconUser } from '@tabler/icons-react';

// Mock data for notifications
const mockNotifications = [
    {
        id: 1,
        type: 'schedule',
        title: 'Lịch học mới đã được cập nhật',
        message: 'Lịch học môn Lập trình Web đã được cập nhật cho học kỳ 2024.1',
        timestamp: '10 phút trước',
        read: false,
        icon: <IconCalendar size={20} />,
        color: 'blue'
    },
    {
        id: 2,
        type: 'exam',
        title: 'Thông báo lịch thi',
        message: 'Lịch thi cuối kỳ môn Cơ sở dữ liệu sẽ diễn ra vào ngày 15/05/2024',
        timestamp: '1 giờ trước',
        read: false,
        icon: <IconBook size={20} />,
        color: 'red'
    },
    {
        id: 3,
        type: 'system',
        title: 'Cập nhật hệ thống',
        message: 'Hệ thống đã được nâng cấp với nhiều tính năng mới',
        timestamp: '2 giờ trước',
        read: true,
        icon: <IconBell size={20} />,
        color: 'green'
    },
    {
        id: 4,
        type: 'profile',
        title: 'Thông tin cá nhân',
        message: 'Vui lòng cập nhật thông tin cá nhân của bạn',
        timestamp: '1 ngày trước',
        read: true,
        icon: <IconUser size={20} />,
        color: 'yellow'
    }
];

const NotificationItem = ({ notification }: { notification: typeof mockNotifications[0] }) => {
    return (
        <Paper
            p="md"
            radius="md"
            withBorder
            style={{
                backgroundColor: notification.read ? 'white' : '#f8f9fa',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            }}
        >
            <Group justify="space-between" mb="xs">
                <Group>
                    <Avatar color={notification.color} radius="xl">
                        {notification.icon}
                    </Avatar>
                    <div>
                        <Text fw={500} size="sm">
                            {notification.title}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {notification.timestamp}
                        </Text>
                    </div>
                </Group>
                {!notification.read && (
                    <Badge color="blue" variant="light">
                        Mới
                    </Badge>
                )}
            </Group>
            <Text size="sm" c="dimmed">
                {notification.message}
            </Text>
            <Group justify="flex-end" mt="md">
                <ActionIcon variant="light" color="green" size="sm">
                    <IconCheck size={16} />
                </ActionIcon>
                <ActionIcon variant="light" color="red" size="sm">
                    <IconX size={16} />
                </ActionIcon>
            </Group>
        </Paper>
    );
};

const NotificationsPage = () => {
    return (
        <Paper shadow="sm" p="xl" radius="md" withBorder>
            <Stack gap="lg">
                <Group justify="space-between">
                    <Title order={2}>Thông báo</Title>
                    <Badge size="lg" variant="light">
                        {mockNotifications.filter(n => !n.read).length} thông báo mới
                    </Badge>
                </Group>
                
                <ScrollArea h={500}>
                    <Stack gap="md">
                        {mockNotifications.map((notification) => (
                            <React.Fragment key={notification.id}>
                                <NotificationItem notification={notification} />
                                {notification.id !== mockNotifications.length && <Divider />}
                            </React.Fragment>
                        ))}
                    </Stack>
                </ScrollArea>
            </Stack>
        </Paper>
    );
};

export default NotificationsPage; 