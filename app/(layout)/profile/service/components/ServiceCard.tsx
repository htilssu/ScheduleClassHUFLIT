import React from 'react';
import { Card, Badge, Group, Text, Stack, ThemeIcon, Button, Paper, rem } from "@mantine/core";
import { IconCheck, IconCalendar } from '@tabler/icons-react';

interface ServiceFeature {
    title: string;
    price: string;
    salePrice: string | null;
    discount: string | null;
    yearlyDiscount: string | null;
    features: string[];
    icon: any;
    color: string;
    status: string;
    yearlyPrice?: string;
    yearlySalePrice?: string;
}

interface ServiceCardProps {
    service: ServiceFeature;
    onUpgrade: (service: ServiceFeature) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onUpgrade }) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Group gap="xs">
                        <ThemeIcon
                            size="lg"
                            variant="light"
                            color={service.color}
                        >
                            {React.createElement(service.icon, { style: { width: rem(20), height: rem(20) } })}
                        </ThemeIcon>
                        <Text fw={500} size="lg">{service.title}</Text>
                    </Group>
                    <Badge 
                        color={service.status === "Đang sử dụng" ? "green" : "gray"}
                        variant="light"
                    >
                        {service.status}
                    </Badge>
                </Group>
            </Card.Section>

            <Stack mt="md" gap="xs">
                {service.salePrice ? (
                    <>
                        <Group gap="xs" justify="center">
                            <Text size="xl" fw={700} c="dimmed" style={{ textDecoration: 'line-through' }}>
                                {service.price}
                            </Text>
                            <Badge color="red" variant="filled" size="lg">
                                -{service.discount}
                            </Badge>
                        </Group>
                        <Text size="xl" fw={700} ta="center" c="red">
                            {service.salePrice}
                        </Text>
                    </>
                ) : (
                    <Text size="xl" fw={700} ta="center">
                        {service.price}
                    </Text>
                )}
                <Text size="sm" c="dimmed" ta="center">
                    {service.status === "Đang sử dụng" ? "Gói hiện tại của bạn" : "Nâng cấp ngay hôm nay"}
                </Text>
            </Stack>

            {service.yearlyDiscount && (
                <Paper withBorder p="xs" mt="md" bg="var(--mantine-color-red-0)">
                    <Group gap="xs" justify="center">
                        <IconCalendar size={16} color="var(--mantine-color-red-6)" />
                        <Text size="sm" fw={500} c="red">
                            Đăng ký năm - Tiết kiệm {service.yearlyDiscount}
                        </Text>
                    </Group>
                    <Group gap="xs" justify="center" mt="xs">
                        <Text size="sm" c="dimmed" style={{ textDecoration: 'line-through' }}>
                            {service.yearlyPrice}
                        </Text>
                        <Text size="sm" fw={700} c="red">
                            {service.yearlySalePrice}
                        </Text>
                    </Group>
                </Paper>
            )}

            <Stack mt="md" gap="xs">
                {service.features.map((feature, idx) => (
                    <Group key={idx} gap="xs">
                        <ThemeIcon size="sm" variant="light" color="green">
                            <IconCheck size={16} />
                        </ThemeIcon>
                        <Text size="sm">{feature}</Text>
                    </Group>
                ))}
            </Stack>

            <Stack mt="md" gap="xs">
                <Button 
                    variant={service.status === "Đang sử dụng" ? "light" : "filled"}
                    color={service.color}
                    fullWidth 
                    onClick={() => service.status !== "Đang sử dụng" && onUpgrade(service)}
                >
                    {service.status === "Đang sử dụng" ? "Gói hiện tại" : "Nâng cấp"}
                </Button>
                {service.yearlyDiscount && (
                    <Button 
                        variant="light"
                        color="red"
                        fullWidth
                        onClick={() => service.status !== "Đang sử dụng" && onUpgrade(service)}
                    >
                        Đăng ký năm - Tiết kiệm {service.yearlyDiscount}
                    </Button>
                )}
            </Stack>
        </Card>
    );
};

export default ServiceCard; 