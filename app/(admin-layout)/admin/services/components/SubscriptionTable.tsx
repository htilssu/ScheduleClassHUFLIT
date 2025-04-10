import { Card, Text, Title, Table, Badge } from '@mantine/core';
import { Subscription } from '../types';
import { formatDate } from '../utils';

interface SubscriptionTableProps {
  subscriptions: Subscription[];
}

export function SubscriptionTable({ subscriptions }: SubscriptionTableProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Title order={3}>Danh sách đăng ký</Title>
        <Text size="sm" c="dimmed">
          Quản lý các đăng ký gói dịch vụ của người dùng
        </Text>
      </Card.Section>

      <Table mt="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Người dùng</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Gói dịch vụ</Table.Th>
            <Table.Th>Ngày bắt đầu</Table.Th>
            <Table.Th>Ngày kết thúc</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th>Phương thức thanh toán</Table.Th>
            <Table.Th>Trạng thái thanh toán</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {subscriptions.map((subscription) => (
            <Table.Tr key={subscription.id}>
              <Table.Td>{subscription.userName}</Table.Td>
              <Table.Td>{subscription.userEmail}</Table.Td>
              <Table.Td>{subscription.packageName}</Table.Td>
              <Table.Td>{formatDate(subscription.startDate)}</Table.Td>
              <Table.Td>{formatDate(subscription.endDate)}</Table.Td>
              <Table.Td>
                <Badge color={subscription.status === "active" ? "blue" : "gray"}>
                  {subscription.status === "active" ? "Hoạt động" : "Hết hạn"}
                </Badge>
              </Table.Td>
              <Table.Td>{subscription.paymentMethod}</Table.Td>
              <Table.Td>
                <Badge color={subscription.paymentStatus === "paid" ? "green" : "red"}>
                  {subscription.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                </Badge>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
} 