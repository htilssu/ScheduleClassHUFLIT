import { Stack, Button, FileInput, Switch, Select } from '@mantine/core';

export const BackupSettings = () => {
  return (
    <Stack>
      <Button variant="light" color="orange">
        Tạo bản sao lưu
      </Button>
      <FileInput
        label="Phục hồi từ bản sao lưu"
        placeholder="Chọn file sao lưu"
      />
      <Switch
        label="Sao lưu tự động"
        description="Tự động sao lưu định kỳ"
      />
      <Select
        label="Tần suất sao lưu"
        data={[
          { value: 'daily', label: 'Hàng ngày' },
          { value: 'weekly', label: 'Hàng tuần' },
          { value: 'monthly', label: 'Hàng tháng' }
        ]}
      />
    </Stack>
  );
}; 