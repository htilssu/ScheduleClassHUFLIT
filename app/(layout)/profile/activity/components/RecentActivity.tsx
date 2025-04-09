import React from 'react';
import { Stack, Title, Text, Card, Group, Badge, Timeline, Button, Avatar, Divider } from '@mantine/core';
import { 
  IconCalendar, 
  IconClock, 
  IconDeviceMobile, 
  IconMapPin, 
  IconSearch, 
  IconEdit, 
  IconTrash,
  IconEye,
  IconDownload,
  IconUpload,
  IconLogin,
  IconLogout,
  IconSettings,
  IconUser
} from '@tabler/icons-react';

// Sample activity data - in a real app, this would come from an API
const sampleActivities = [
  {
    id: '1',
    type: 'login',
    title: 'Đăng nhập thành công',
    description: 'Đăng nhập từ thiết bị mới',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    icon: <IconLogin size={16} />,
    color: 'green',
    device: 'Windows / Chrome',
    location: 'Hà Nội, Việt Nam'
  },
  {
    id: '2',
    type: 'search',
    title: 'Tìm kiếm lịch học',
    description: 'Tìm kiếm lịch học cho học kỳ 2023-2024',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    icon: <IconSearch size={16} />,
    color: 'blue'
  },
  {
    id: '3',
    type: 'edit',
    title: 'Cập nhật thông tin cá nhân',
    description: 'Cập nhật email và số điện thoại',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    icon: <IconEdit size={16} />,
    color: 'yellow'
  },
  {
    id: '4',
    type: 'download',
    title: 'Tải xuống lịch học',
    description: 'Tải xuống lịch học dạng PDF',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    icon: <IconDownload size={16} />,
    color: 'indigo'
  },
  {
    id: '5',
    type: 'settings',
    title: 'Thay đổi cài đặt',
    description: 'Bật thông báo email',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    icon: <IconSettings size={16} />,
    color: 'grape'
  },
  {
    id: '6',
    type: 'logout',
    title: 'Đăng xuất',
    description: 'Đăng xuất khỏi tài khoản',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    icon: <IconLogout size={16} />,
    color: 'red'
  }
];

// Helper function to format time ago
const formatTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Vừa xong';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} phút trước`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} giờ trước`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ngày trước`;
  }
};

// Helper function to get activity type label
const getActivityTypeLabel = (type: string) => {
  switch (type) {
    case 'login':
      return 'Đăng nhập';
    case 'logout':
      return 'Đăng xuất';
    case 'search':
      return 'Tìm kiếm';
    case 'edit':
      return 'Chỉnh sửa';
    case 'download':
      return 'Tải xuống';
    case 'upload':
      return 'Tải lên';
    case 'settings':
      return 'Cài đặt';
    default:
      return 'Hoạt động';
  }
};

const RecentActivity: React.FC = () => {
  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Hoạt động gần đây</Title>
        <Button variant="light" color="blue" leftSection={<IconCalendar size={16} />}>
          Xem tất cả
        </Button>
      </Group>
      
      <Card withBorder radius="md" p="md">
        <Timeline active={1} bulletSize={24} lineWidth={2}>
          {sampleActivities.map((activity, index) => (
            <Timeline.Item 
              key={activity.id}
              bullet={<Avatar size={24} radius="xl" color={activity.color}>{activity.icon}</Avatar>}
              title={
                <Group gap="xs">
                  <Text fw={500}>{activity.title}</Text>
                  <Badge size="sm" variant="light" color={activity.color}>
                    {getActivityTypeLabel(activity.type)}
                  </Badge>
                </Group>
              }
            >
              <Text size="sm" c="dimmed">{activity.description}</Text>
              <Group gap="xs" mt={5}>
                <IconClock size={14} />
                <Text size="xs">{formatTimeAgo(activity.timestamp)}</Text>
              </Group>
              
              {(activity.device || activity.location) && (
                <Group gap="xs" mt={5}>
                  {activity.device && (
                    <>
                      <IconDeviceMobile size={14} />
                      <Text size="xs">{activity.device}</Text>
                    </>
                  )}
                  {activity.location && (
                    <>
                      <IconMapPin size={14} />
                      <Text size="xs">{activity.location}</Text>
                    </>
                  )}
                </Group>
              )}
              
              {index < sampleActivities.length - 1 && <Divider my="sm" />}
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
      
      <Card withBorder radius="md" p="md">
        <Group justify="space-between" mb="md">
          <Text fw={500}>Thống kê hoạt động</Text>
          <Button variant="subtle" size="xs">Xem chi tiết</Button>
        </Group>
        
        <Group grow>
          <Card withBorder radius="md" p="xs">
            <Stack align="center" gap={5}>
              <IconLogin size={24} color="#40c057" />
              <Text size="xl" fw={700}>24</Text>
              <Text size="xs" c="dimmed">Lần đăng nhập</Text>
            </Stack>
          </Card>
          
          <Card withBorder radius="md" p="xs">
            <Stack align="center" gap={5}>
              <IconSearch size={24} color="#228be6" />
              <Text size="xl" fw={700}>156</Text>
              <Text size="xs" c="dimmed">Lần tìm kiếm</Text>
            </Stack>
          </Card>
          
          <Card withBorder radius="md" p="xs">
            <Stack align="center" gap={5}>
              <IconDownload size={24} color="#fd7e14" />
              <Text size="xl" fw={700}>12</Text>
              <Text size="xs" c="dimmed">Lần tải xuống</Text>
            </Stack>
          </Card>
        </Group>
      </Card>
    </Stack>
  );
};

export default RecentActivity; 