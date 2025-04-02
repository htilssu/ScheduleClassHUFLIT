import React from 'react';
import { Paper, Title, Text, Stack } from '@mantine/core';

const SettingsPage = () => {
    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack>
                <Title order={2}>Cài đặt</Title>
                <Text>Các tùy chọn cài đặt tài khoản của bạn sẽ được hiển thị ở đây.</Text>
            </Stack>
        </Paper>
    );
};

export default SettingsPage; 