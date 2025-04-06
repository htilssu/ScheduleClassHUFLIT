import { Stack, Switch, NumberInput, Textarea } from '@mantine/core';

export const SecuritySettings = () => {
  return (
    <Stack>
      <Switch
        label="Xác thực 2 bước"
        description="Yêu cầu xác thực 2 bước khi đăng nhập"
      />
      <NumberInput
        label="Số lần đăng nhập sai tối đa"
        min={1}
        max={10}
      />
      <Textarea
        label="Danh sách IP bị chặn"
        placeholder="Nhập các IP bị chặn, mỗi IP một dòng"
      />
      <Switch
        label="Bật reCAPTCHA"
        description="Yêu cầu xác thực reCAPTCHA"
      />
    </Stack>
  );
}; 