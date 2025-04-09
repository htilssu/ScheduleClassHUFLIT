import React, { useState } from 'react';
import { 
  Card, 
  Group, 
  Text, 
  Switch, 
  Button, 
  Divider, 
  Stack, 
  ActionIcon, 
  Tooltip, 
  Alert,
  Modal
} from '@mantine/core';
import { 
  IconShieldLock, 
  IconDeviceMobile, 
  IconQrcode, 
  IconKey, 
  IconLock, 
  IconCalendar, 
  IconCheck,
  IconInfoCircle
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface SecuritySettingsProps {
  is2FAEnabled: boolean;
  onToggle2FA: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ is2FAEnabled, onToggle2FA }) => {
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleToggle2FA = () => {
    if (is2FAEnabled) {
      onToggle2FA();
      notifications.show({
        title: 'Thông báo',
        message: 'Đã tắt xác thực 2 yếu tố',
        color: 'blue',
      });
    } else {
      setIs2FAModalOpen(true);
    }
  };

  const handleSetup2FA = () => {
    setShowQRCode(true);
    // Giả lập mã QR và secret
    notifications.show({
      title: 'Thông báo',
      message: 'Đã tạo mã QR và secret. Vui lòng quét mã QR bằng ứng dụng xác thực.',
      color: 'blue',
    });
  };

  const handleVerify2FA = () => {
    if (verificationCode.length === 6) {
      onToggle2FA();
      setIs2FAModalOpen(false);
      setShowQRCode(false);
      setVerificationCode('');
      notifications.show({
        title: 'Thành công',
        message: 'Đã bật xác thực 2 yếu tố thành công',
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'Lỗi',
        message: 'Mã xác thực không hợp lệ',
        color: 'red',
      });
    }
  };

  return (
    <Stack>
      {/* Two-Factor Authentication Card */}
      <Card withBorder radius="md" p="md">
        <Group justify="space-between" mb="md">
          <Group>
            <IconShieldLock size={24} color="#228be6" />
            <div>
              <Text fw={500} size="lg">Xác thực 2 yếu tố</Text>
              <Text size="sm" c="dimmed">
                Tăng cường bảo mật cho tài khoản của bạn
              </Text>
            </div>
          </Group>
          <Switch 
            checked={is2FAEnabled} 
            onChange={handleToggle2FA}
            size="md"
            color="blue"
          />
        </Group>
        
        <Divider my="sm" />
        
        <Group justify="space-between">
          <Group>
            <IconDeviceMobile size={20} />
            <div>
              <Text fw={500}>Trạng thái</Text>
              <Text size="sm" c={is2FAEnabled ? "green" : "dimmed"}>
                {is2FAEnabled ? "Đã bật" : "Chưa bật"}
              </Text>
            </div>
          </Group>
          {!is2FAEnabled && (
            <Button 
              variant="light" 
              color="blue" 
              leftSection={<IconQrcode size={16} />}
              onClick={handleSetup2FA}
            >
              Thiết lập
            </Button>
          )}
        </Group>
        
        {is2FAEnabled && (
          <Alert icon={<IconCheck size={16} />} color="green" mt="md">
            Tài khoản của bạn đã được bảo vệ bằng xác thực 2 yếu tố.
          </Alert>
        )}
      </Card>
      
      {/* Password Security Card */}
      <Card withBorder radius="md" p="md">
        <Group justify="space-between" mb="md">
          <Group>
            <IconKey size={24} color="#40c057" />
            <div>
              <Text fw={500} size="lg">Mật khẩu</Text>
              <Text size="sm" c="dimmed">
                Quản lý mật khẩu tài khoản
              </Text>
            </div>
          </Group>
          <Button variant="light" color="green">
            Đổi mật khẩu
          </Button>
        </Group>
        
        <Divider my="sm" />
        
        <Group justify="space-between">
          <Group>
            <IconLock size={20} />
            <div>
              <Text fw={500}>Cập nhật lần cuối</Text>
              <Text size="sm" c="dimmed">
                {new Date().toLocaleDateString('vi-VN')}
              </Text>
            </div>
          </Group>
          <Tooltip label="Đề xuất đổi mật khẩu định kỳ">
            <ActionIcon color="blue" variant="light">
              <IconInfoCircle size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Card>
      
      {/* Login History Card */}
      <Card withBorder radius="md" p="md">
        <Group justify="space-between" mb="md">
          <Group>
            <IconCalendar size={24} color="#fd7e14" />
            <div>
              <Text fw={500} size="lg">Lịch sử đăng nhập</Text>
              <Text size="sm" c="dimmed">
                Xem các phiên đăng nhập gần đây
              </Text>
            </div>
          </Group>
          <Button variant="light" color="orange">
            Xem chi tiết
          </Button>
        </Group>
        
        <Divider my="sm" />
        
        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="sm">Đăng nhập lần cuối</Text>
            <Text size="sm" fw={500}>{new Date().toLocaleString('vi-VN')}</Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Thiết bị</Text>
            <Text size="sm">Windows / Chrome</Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Địa điểm</Text>
            <Text size="sm">Hà Nội, Việt Nam</Text>
          </Group>
        </Stack>
      </Card>

      {/* 2FA Setup Modal */}
      <Modal 
        opened={is2FAModalOpen} 
        onClose={() => setIs2FAModalOpen(false)}
        title="Thiết lập xác thực 2 yếu tố"
        size="lg"
      >
        <Stack>
          {!showQRCode ? (
            <>
              <Alert icon={<IconInfoCircle size={16} />} color="blue">
                Xác thực 2 yếu tố sẽ yêu cầu bạn nhập mã xác thực từ ứng dụng xác thực mỗi khi đăng nhập.
              </Alert>
              
              <Card withBorder radius="md" p="md">
                <Stack gap="md">
                  <Text fw={500}>Các bước thiết lập:</Text>
                  <Group>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#228be6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>1</div>
                    <Text>Tải ứng dụng xác thực như Google Authenticator, Authy, hoặc Microsoft Authenticator</Text>
                  </Group>
                  <Group>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#228be6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>2</div>
                    <Text>Quét mã QR bằng ứng dụng xác thực</Text>
                  </Group>
                  <Group>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#228be6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>3</div>
                    <Text>Nhập mã xác thực 6 chữ số để xác nhận</Text>
                  </Group>
                </Stack>
              </Card>
              
              <Group justify="flex-end">
                <Button variant="default" onClick={() => setIs2FAModalOpen(false)}>
                  Hủy
                </Button>
                <Button color="blue" onClick={handleSetup2FA}>
                  Tiếp tục
                </Button>
              </Group>
            </>
          ) : (
            <>
              <Alert icon={<IconQrcode size={16} />} color="blue">
                Quét mã QR bên dưới bằng ứng dụng xác thực của bạn.
              </Alert>
              
              <Card withBorder radius="md" p="md" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 200, height: 200, backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconQrcode size={150} />
                </div>
              </Card>
              
              <Text size="sm" c="dimmed" ta="center">
                Hoặc nhập mã thủ công: <Text component="span" fw={700}>ABCD EFGH IJKL MNOP</Text>
              </Text>
              
              <Text fw={500}>Nhập mã xác thực:</Text>
              <Group>
                <input 
                  type="text" 
                  maxLength={6} 
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    fontSize: '18px', 
                    letterSpacing: '8px', 
                    textAlign: 'center',
                    borderRadius: '4px',
                    border: '1px solid #ced4da'
                  }}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="000000"
                />
              </Group>
              
              <Group justify="flex-end">
                <Button variant="default" onClick={() => setShowQRCode(false)}>
                  Quay lại
                </Button>
                <Button color="blue" onClick={handleVerify2FA}>
                  Xác nhận
                </Button>
              </Group>
            </>
          )}
        </Stack>
      </Modal>
    </Stack>
  );
};

export default SecuritySettings; 