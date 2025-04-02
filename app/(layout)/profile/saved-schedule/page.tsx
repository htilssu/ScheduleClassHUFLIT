import React from 'react';
import { Paper, Title, Text, Stack } from '@mantine/core';

const SavedSchedulePage = () => {
    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack>
                <Title order={2}>Lịch học đã lưu</Title>
                <Text>Danh sách các lịch học bạn đã lưu sẽ được hiển thị ở đây.</Text>
            </Stack>
        </Paper>
    );
};

export default SavedSchedulePage; 