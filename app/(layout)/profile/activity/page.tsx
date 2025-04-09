'use client'

import React, { useState } from 'react';
import { Paper, Title, Stack, Tabs, Text } from '@mantine/core';
import useUser from "@/lib/hook/useUser";
import { User } from "@/lib/state/user";
import Loading from "@/app/loading";
import AccountInfo from './components/AccountInfo';
import SecuritySettings from './components/SecuritySettings';
import AccountManagement from './components/AccountManagement';
import RecentActivity from './components/RecentActivity';

const ActivityPage = () => {
    const { data: user, loading } = useUser();
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-10">
                <Text size="xl" c="dimmed">
                    Không tìm thấy thông tin tài khoản.
                </Text>
            </div>
        );
    }

    const handleToggle2FA = () => {
        setIs2FAEnabled(!is2FAEnabled);
    };

    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack>
                <Title order={2}>Quản lý tài khoản</Title>
                
                {/* Basic Account Information */}
                <AccountInfo user={user} />

                <Tabs defaultValue="activity">
                    <Tabs.List>
                        <Tabs.Tab value="activity">Hoạt động</Tabs.Tab>
                        <Tabs.Tab value="security">Bảo mật</Tabs.Tab>
                        <Tabs.Tab value="feedback">Đánh giá</Tabs.Tab>
                        <Tabs.Tab value="account">Tài khoản</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="activity" pt="md">
                        <RecentActivity />
                    </Tabs.Panel>

                    <Tabs.Panel value="security" pt="md">
                        <SecuritySettings 
                            is2FAEnabled={is2FAEnabled} 
                            onToggle2FA={handleToggle2FA} 
                        />
                    </Tabs.Panel>

                    <Tabs.Panel value="feedback" pt="md">
                        <Stack>
                            <Title order={3}>Đánh giá</Title>
                            <Text>Danh sách các đánh giá của bạn sẽ được hiển thị ở đây.</Text>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="account" pt="md">
                        <AccountManagement isLocked={user.isLocked || false} />
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Paper>
    );
};

export default ActivityPage;