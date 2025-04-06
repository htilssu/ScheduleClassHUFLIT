import { Stack, TextInput, NumberInput, Switch } from '@mantine/core';

export const NotificationSettings = () => {
  return (
    <Stack>
      <TextInput
        label="SMTP Host"
        placeholder="smtp.example.com"
      />
      <NumberInput
        label="SMTP Port"
        min={1}
        max={65535}
      />
      <TextInput
        label="SMTP Username"
        placeholder="username"
      />
      <TextInput
        label="SMTP Password"
        type="password"
        placeholder="password"
      />
      <Switch
        label="Bật thông báo popup"
        description="Hiển thị thông báo dạng popup"
      />
      <Switch
        label="Bật thông báo banner"
        description="Hiển thị thông báo dạng banner"
      />
    </Stack>
  );
}; 