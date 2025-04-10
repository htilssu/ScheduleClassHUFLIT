import React from 'react';
import { Paper, Title, Text, Stack, Group, Badge, ActionIcon, ScrollArea, Divider, Avatar, Button } from '@mantine/core';
import { IconCheck, IconX, IconBell, IconCalendar, IconBook, IconUser, IconCrown } from '@tabler/icons-react';

// Mock data for notifications
const mockNotifications = [
    {
        id: 1,
        type: 'vip',
        title: '🎉 Ưu đãi đặc biệt: Gói VIP đang giảm giá',
        message: 'Nâng cấp ngay hôm nay để nhận ưu đãi giảm 50% và nhiều quyền lợi độc quyền khác!',
        timestamp: 'Vừa xong',
        read: false,
        icon: <IconCrown size={20} />,
        color: 'yellow',
        isPromotion: true
    },
    {
        id: 2,
        type: 'schedule',
        title: 'Lịch học mới đã được cập nhật',
        message: 'Lịch học môn Lập trình Web đã được cập nhật cho học kỳ 2024.1',
        timestamp: '10 phút trước',
        read: false,
        icon: <IconCalendar size={20} />,
        color: 'blue'
    },
    {
        id: 3,
        type: 'exam',
        title: 'Thông báo lịch thi',
        message: 'Lịch thi cuối kỳ môn Cơ sở dữ liệu sẽ diễn ra vào ngày 15/05/2024',
        timestamp: '1 giờ trước',
        read: false,
        icon: <IconBook size={20} />,
        color: 'red'
    },
    {
        id: 4,
        type: 'system',
        title: 'Cập nhật hệ thống',
        message: 'Hệ thống đã được nâng cấp với nhiều tính năng mới',
        timestamp: '2 giờ trước',
        read: true,
        icon: <IconBell size={20} />,
        color: 'green'
    },
    {
        id: 5,
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
                transition: 'all 0.2s ease',
                ...(notification.isPromotion && {
                    background: 'linear-gradient(135deg, #f6f8fc 0%, #f0f4f8 100%)',
                    border: '1px solid #e9ecef',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                })
            }}
        >
            <Group justify="space-between" mb="xs">
                <Group>
                    <Avatar color={notification.color} radius="xl">
                        {notification.icon}
                    </Avatar>
                    <div>
                        <Text fw={500} size="sm" c={notification.isPromotion ? 'dark' : undefined}>
                            {notification.title}
                        </Text>
                        <Text size="xs" c={notification.isPromotion ? 'dark' : 'dimmed'}>
                            {notification.timestamp}
                        </Text>
                    </div>
                </Group>
                {!notification.read && !notification.isPromotion && (
                    <Badge color="blue" variant="light">
                        Mới
                    </Badge>
                )}
            </Group>
            <Text size="sm" c={notification.isPromotion ? 'dark' : 'dimmed'}>
                {notification.message}
            </Text>
            <Group justify="flex-end" mt="md">
                {notification.isPromotion ? (
                    <Button
                        variant="filled"
                        color="blue"
                        size="sm"
                        leftSection={<IconCrown size={16} />}
                        style={{
                            background: 'linear-gradient(135deg, #228be6 0%, #1c7ed6 100%)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }
                        }}
                    >
                        Nâng cấp ngay
                    </Button>
                ) : (
                    <>
                        <ActionIcon variant="light" color="green" size="sm">
                            <IconCheck size={16} />
                        </ActionIcon>
                        <ActionIcon variant="light" color="red" size="sm">
                            <IconX size={16} />
                        </ActionIcon>
                    </>
                )}
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
                        {mockNotifications.map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <NotificationItem notification={notification} />
                                {index !== mockNotifications.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </Stack>
                </ScrollArea>
            </Stack>
        </Paper>
    );
};

export default NotificationsPage; 