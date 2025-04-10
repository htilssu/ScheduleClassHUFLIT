import { Card, Text, Title, Table, Badge } from '@mantine/core';
import { PaymentHistoryItem } from '../types';
import { formatCurrency, formatDate } from '../utils';

interface PaymentHistoryTableProps {
  payments: PaymentHistoryItem[];
}

export function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Title order={3}>Lịch sử thanh toán</Title>
        <Text size="sm" c="dimmed">
          Xem lịch sử thanh toán của người dùng
        </Text>
      </Card.Section>

      <Table mt="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Người dùng</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Gói dịch vụ</Table.Th>
            <Table.Th>Số tiền</Table.Th>
            <Table.Th>Phương thức thanh toán</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th>Mã giao dịch</Table.Th>
            <Table.Th>Ngày thanh toán</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {payments.map((payment) => (
            <Table.Tr key={payment.id}>
              <Table.Td>{payment.userName}</Table.Td>
              <Table.Td>{payment.userEmail}</Table.Td>
              <Table.Td>{payment.packageName}</Table.Td>
              <Table.Td>{formatCurrency(payment.amount)}</Table.Td>
              <Table.Td>{payment.paymentMethod}</Table.Td>
              <Table.Td>
                <Badge color={payment.paymentStatus === "success" ? "green" : "red"}>
                  {payment.paymentStatus === "success" ? "Thành công" : "Thất bại"}
                </Badge>
              </Table.Td>
              <Table.Td>{payment.transactionId}</Table.Td>
              <Table.Td>{formatDate(payment.date)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
} 