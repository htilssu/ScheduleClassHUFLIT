import React from 'react';
import { Paper, Stack, Text, Title, Group, Badge } from "@mantine/core";
import { IconDiscount } from '@tabler/icons-react';

const ServiceHeader: React.FC = () => {
    return (
        <Paper shadow="sm" p="xl" radius="md" withBorder>
            <Stack gap="xs">
                <Group justify="space-between" align="center">
                    <div>
                        <Title order={2}>Dịch Vụ Của Bạn</Title>
                        <Text c="dimmed" size="sm">Quản lý và nâng cấp gói dịch vụ của bạn</Text>
                    </div>
                    <Badge size="lg" variant="filled" color="red" leftSection={<IconDiscount size={16} />}>
                        Khuyến mãi lớn - Giảm đến 40% khi đăng ký năm
                    </Badge>
                </Group>
            </Stack>
        </Paper>
    );
};

export default ServiceHeader; 