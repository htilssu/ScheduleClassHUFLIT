import { 
  Card, 
  Text, 
  Badge, 
  Button, 
  Group, 
  Stack 
} from '@mantine/core';
import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { ServicePackage } from '../types';
import { formatCurrency, formatDate } from '../utils';

interface ServicePackageCardProps {
  pkg: ServicePackage;
  onEdit: (pkg: ServicePackage) => void;
  onDelete: (id: string) => void;
}

export function ServicePackageCard({ pkg, onEdit, onDelete }: ServicePackageCardProps) {
  const finalPrice = pkg.price * (1 - pkg.discountPercentage / 100);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <div>
            <Text fw={500} size="lg" lineClamp={1}>{pkg.name}</Text>
            <Text size="sm" c="dimmed" lineClamp={2}>{pkg.description}</Text>
          </div>
          <Badge color={pkg.status === "active" ? "green" : "gray"}>
            {pkg.status === "active" ? "Hoạt động" : "Không hoạt động"}
          </Badge>
        </Group>
      </Card.Section>

      <Stack gap="xs" mt="md" style={{ flex: 1 }}>
        <Group justify="space-between">
          <div>
            <Text fw={700} size="xl">{formatCurrency(finalPrice)}</Text>
            {pkg.discountPercentage > 0 && (
              <Group gap="xs">
                <Text size="sm" c="dimmed" td="line-through">{formatCurrency(pkg.price)}</Text>
                <Badge color="red">-{pkg.discountPercentage}%</Badge>
              </Group>
            )}
          </div>
          <Text size="sm" c="dimmed">/ {pkg.duration} ngày</Text>
        </Group>
        
        <Text fw={500}>Tính năng:</Text>
        <Stack gap="xs" style={{ flex: 1 }}>
          {pkg.features.map((feature, index) => (
            <Group key={index} gap="xs">
              <CheckCircle size={16} color="green" />
              <Text size="sm" lineClamp={1}>{feature}</Text>
            </Group>
          ))}
        </Stack>
        
        <Group justify="space-between" mt="auto">
          <Text size="sm" c="dimmed">Người đăng ký: {pkg.subscribers}</Text>
          <Text size="sm" c="dimmed">Cập nhật: {formatDate(pkg.updatedAt)}</Text>
        </Group>
      </Stack>

      <Group justify="space-between" mt="md">
        <Button 
          variant="light" 
          leftSection={<Edit size={16} />}
          onClick={() => onEdit(pkg)}
        >
          Chỉnh sửa
        </Button>
        <Button 
          variant="light" 
          color="red" 
          leftSection={<Trash2 size={16} />}
          onClick={() => onDelete(pkg.id)}
        >
          Xóa
        </Button>
      </Group>
    </Card>
  );
} 