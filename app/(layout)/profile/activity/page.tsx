'use client'

import React from 'react';
import { Paper, Title, Text, Stack, Tabs } from '@mantine/core';

const ActivityPage = () => {
    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack>
                <Title order={2}>Quản lý tài khoản</Title>
                <Tabs defaultValue="activity">
                    <Tabs.List>
                        <Tabs.Tab value="activity">Hoạt động</Tabs.Tab>
                        <Tabs.Tab value="security">Bảo mật</Tabs.Tab>
                        <Tabs.Tab value="feedback">Đánh giá</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="activity" pt="md">
                        <Stack>
                            <Title order={3}>Hoạt động của bạn</Title>
                            <Text>Danh sách các hoạt động gần đây của bạn sẽ được hiển thị ở đây.</Text>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="security" pt="md">
                        <Stack>
                            <Title order={3}>Bảo mật</Title>
                            <Text>Các tùy chọn bảo mật tài khoản của bạn sẽ được hiển thị ở đây.</Text>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="feedback" pt="md">
                        <Stack>
                            <Title order={3}>Đánh giá</Title>
                            <Text>Danh sách các đánh giá của bạn sẽ được hiển thị ở đây.</Text>
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Paper>
    );
};

export default ActivityPage;