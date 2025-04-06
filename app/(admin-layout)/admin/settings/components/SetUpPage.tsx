'use client'

import { Tabs, Paper, Title, Stack, Button, Group, Divider } from '@mantine/core';
import { IconSettings, IconPalette, IconFileText, IconBell, IconLock, IconCreditCard, IconDatabase, IconPlug } from '@tabler/icons-react';
import { useState } from 'react';
import { SystemSettings } from './SystemSettings';
import { BrandingSettings } from './BrandingSettings';
import { ContentSettings } from './ContentSettings';
import { PaymentSettings } from './PaymentSettings';
import { BackupSettings } from './BackupSettings';
import { IntegrationSettings } from './IntegrationSettings';
import { NotificationSettings } from './NotificationSettings';
import { SecuritySettings } from './SecuritySettings';

const SetUpPage = () => {
    const [activeTab, setActiveTab] = useState<string | null>('system');

    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack>
                <Title order={2}>Cài đặt hệ thống</Title>
                
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <Tabs.List>
                        <Tabs.Tab value="system" leftSection={<IconSettings size={14} />}>
                            Thông tin hệ thống
                        </Tabs.Tab>
                        <Tabs.Tab value="branding" leftSection={<IconPalette size={14} />}>
                            Giao diện & thương hiệu
                        </Tabs.Tab>
                        <Tabs.Tab value="content" leftSection={<IconFileText size={14} />}>
                            Cài đặt nội dung
                        </Tabs.Tab>
                        <Tabs.Tab value="notifications" leftSection={<IconBell size={14} />}>
                            Thông báo & email
                        </Tabs.Tab>
                        <Tabs.Tab value="security" leftSection={<IconLock size={14} />}>
                            Bảo mật
                        </Tabs.Tab>
                        <Tabs.Tab value="payment" leftSection={<IconCreditCard size={14} />}>
                            Thanh toán
                        </Tabs.Tab>
                        <Tabs.Tab value="backup" leftSection={<IconDatabase size={14} />}>
                            Sao lưu & phục hồi
                        </Tabs.Tab>
                        <Tabs.Tab value="integrations" leftSection={<IconPlug size={14} />}>
                            Tích hợp
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="system" pt="md">
                        <SystemSettings />
                    </Tabs.Panel>

                    <Tabs.Panel value="branding" pt="md">
                        <BrandingSettings />
                    </Tabs.Panel>

                    <Tabs.Panel value="content" pt="md">
                        <ContentSettings />
                    </Tabs.Panel>

                    <Tabs.Panel value="notifications" pt="md">
                        <NotificationSettings />
                    </Tabs.Panel>

                    <Tabs.Panel value="security" pt="md">
                        <SecuritySettings />
                    </Tabs.Panel>

                    <Tabs.Panel value="payment" pt="md">
                        <PaymentSettings />
                    </Tabs.Panel>

                    <Tabs.Panel value="backup" pt="md">
                        <BackupSettings />
                    </Tabs.Panel>

                    <Tabs.Panel value="integrations" pt="md">
                        <IntegrationSettings />
                    </Tabs.Panel>
                </Tabs>

                <Divider />

                <Group justify="flex-end">
                    <Button variant="light" color="red">
                        Khôi phục mặc định
                    </Button>
                    <Button color="orange">
                        Lưu thay đổi
                    </Button>
                </Group>
            </Stack>
        </Paper>
    );
};

export default SetUpPage;