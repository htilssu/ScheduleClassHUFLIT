import React from 'react';
import { Paper, Title, Text, Stack } from '@mantine/core';

const NotificationsPage = () => {
    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack>
                <Title order={2}>Thông báo</Title>
                <Text>Danh sách các thông báo của bạn sẽ được hiển thị ở đây.</Text>
            </Stack>
        </Paper>
    );
};

export default NotificationsPage; 