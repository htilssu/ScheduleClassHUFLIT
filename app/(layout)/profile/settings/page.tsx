import React from 'react';
import {
    Paper,
    Title,
    Text,
    Stack,
    Group,
    Switch,
    Select,
    Button,
    Divider,
    Badge,
} from '@mantine/core';

const SettingsPage = () => {

    const notificationSettings = {
        emailNotifications: true,
        pushNotifications: false,
        scheduleUpdates: true,
        systemAnnouncements: true,
    };

    const themeSettings = {
        theme: 'light',
        language: 'vi',
        fontSize: 'medium',
    };

    return (
        <Stack gap="xl">
            <Title order={2}>Cài đặt</Title>

            {/* Notification Settings */}
            <Paper shadow="sm" p="xl" radius="md" withBorder>
                <Stack gap="md">
                    <Group justify="space-between">
                        <Title order={3}>Thông báo</Title>
                        <Badge size="lg" variant="light">Tùy chọn</Badge>
                    </Group>
                    
                    <Stack gap="xs">
                        <Group justify="space-between">
                            <div>
                                <Text fw={500}>Thông báo qua email</Text>
                                <Text size="sm" c="dimmed">Nhận thông báo về lịch học qua email</Text>
                            </div>
                            <Switch defaultChecked={notificationSettings.emailNotifications} />
                        </Group>
                        <Divider />
                        <Group justify="space-between">
                            <div>
                                <Text fw={500}>Thông báo đẩy</Text>
                                <Text size="sm" c="dimmed">Nhận thông báo trực tiếp trên trình duyệt</Text>
                            </div>
                            <Switch defaultChecked={notificationSettings.pushNotifications} />
                        </Group>
                        <Divider />
                        <Group justify="space-between">
                            <div>
                                <Text fw={500}>Cập nhật lịch học</Text>
                                <Text size="sm" c="dimmed">Thông báo khi có thay đổi về lịch học</Text>
                            </div>
                            <Switch defaultChecked={notificationSettings.scheduleUpdates} />
                        </Group>
                    </Stack>
                </Stack>
            </Paper>

            {/* Theme Settings */}
            <Paper shadow="sm" p="xl" radius="md" withBorder>
                <Stack gap="md">
                    <Group justify="space-between">
                        <Title order={3}>Giao diện</Title>
                        <Badge size="lg" variant="light">Tùy chỉnh</Badge>
                    </Group>
                    
                    <Stack gap="xs">
                        <Select
                            label="Giao diện"
                            placeholder="Chọn giao diện"
                            defaultValue={themeSettings.theme}
                            data={[
                                { value: 'light', label: 'Sáng' },
                                { value: 'dark', label: 'Tối' },
                                { value: 'auto', label: 'Tự động' },
                            ]}
                        />
                        <Select
                            label="Ngôn ngữ"
                            placeholder="Chọn ngôn ngữ"
                            defaultValue={themeSettings.language}
                            data={[
                                { value: 'vi', label: 'Tiếng Việt' },
                                { value: 'en', label: 'English' },
                            ]}
                        />
                        <Select
                            label="Cỡ chữ"
                            placeholder="Chọn cỡ chữ"
                            defaultValue={themeSettings.fontSize}
                            data={[
                                { value: 'small', label: 'Nhỏ' },
                                { value: 'medium', label: 'Vừa' },
                                { value: 'large', label: 'Lớn' },
                            ]}
                        />
                    </Stack>
                </Stack>
            </Paper>

            {/* Action Buttons */}
            <Group justify="flex-end" mt="xl">
                <Button variant="light" color="gray">Hủy</Button>
                <Button>Lưu thay đổi</Button>
            </Group>
        </Stack>
    );
};

export default SettingsPage; 