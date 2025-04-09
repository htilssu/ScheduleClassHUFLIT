import React, { useState } from 'react';
import { Stack, Text, Button, Group, Modal, Title } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { requestAccountDeletion, cancelAccountDeletion } from '@/lib/actions/user-actions';

interface AccountManagementProps {
  isLocked: boolean;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ isLocked }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleRequestDeletion = async () => {
    const result = await requestAccountDeletion();
    if (result.success) {
      notifications.show({
        title: 'Thành công',
        message: result.message,
        color: 'green',
      });
      setIsDeleteModalOpen(false);
    } else {
      notifications.show({
        title: 'Lỗi',
        message: result.message,
        color: 'red',
      });
    }
  };

  const handleCancelDeletion = async () => {
    const result = await cancelAccountDeletion();
    if (result.success) {
      notifications.show({
        title: 'Thành công',
        message: result.message,
        color: 'green',
      });
      setIsCancelModalOpen(false);
    } else {
      notifications.show({
        title: 'Lỗi',
        message: result.message,
        color: 'red',
      });
    }
  };

  return (
    <Stack>
      <Title order={3}>Quản lý tài khoản</Title>
      {isLocked ? (
        <Stack>
          <Text c="red">
            <IconAlertCircle size={16} style={{ marginRight: 8 }} />
            Tài khoản của bạn đang trong trạng thái chờ xóa
          </Text>
          <Button 
            color="blue" 
            variant="light"
            onClick={() => setIsCancelModalOpen(true)}
          >
            Hủy yêu cầu xóa tài khoản
          </Button>
        </Stack>
      ) : (
        <Stack>
          <Text>
            Nếu bạn muốn xóa tài khoản, vui lòng nhấn nút bên dưới.
            Sau khi gửi yêu cầu, tài khoản của bạn sẽ bị khóa và chờ admin xử lý.
          </Text>
          <Button 
            color="red" 
            variant="light"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Yêu cầu xóa tài khoản
          </Button>
        </Stack>
      )}

      {/* Delete Account Confirmation Modal */}
      <Modal 
        opened={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Xác nhận yêu cầu xóa tài khoản"
      >
        <Stack>
          <Text>
            Bạn có chắc chắn muốn gửi yêu cầu xóa tài khoản? 
            Sau khi gửi yêu cầu, tài khoản của bạn sẽ bị khóa và chờ admin xử lý.
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setIsDeleteModalOpen(false)}>
              Hủy
            </Button>
            <Button color="red" onClick={handleRequestDeletion}>
              Xác nhận
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Cancel Deletion Confirmation Modal */}
      <Modal 
        opened={isCancelModalOpen} 
        onClose={() => setIsCancelModalOpen(false)}
        title="Hủy yêu cầu xóa tài khoản"
      >
        <Stack>
          <Text>
            Bạn có chắc chắn muốn hủy yêu cầu xóa tài khoản?
            Sau khi hủy, tài khoản của bạn sẽ được mở khóa và hoạt động bình thường.
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setIsCancelModalOpen(false)}>
              Hủy
            </Button>
            <Button color="blue" onClick={handleCancelDeletion}>
              Xác nhận
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default AccountManagement; 