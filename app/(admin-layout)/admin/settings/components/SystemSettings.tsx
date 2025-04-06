import { Stack, TextInput, Textarea, FileInput, Select, Switch } from '@mantine/core';

export const SystemSettings = () => {
  return (
    <Stack>
      <TextInput
        label="Tên trang web"
        placeholder="Nhập tên trang web"
      />
      <Textarea
        label="Mô tả ngắn"
        placeholder="Nhập mô tả ngắn về trang web"
      />
      <FileInput
        label="Logo"
        placeholder="Chọn file logo"
        accept="image/*"
      />
      <FileInput
        label="Favicon"
        placeholder="Chọn file favicon"
        accept="image/*"
      />
      <Select
        label="Ngôn ngữ mặc định"
        data={[
          { value: 'vi', label: 'Tiếng Việt' },
          { value: 'en', label: 'English' }
        ]}
      />
      <Select
        label="Múi giờ"
        data={[
          { value: 'Asia/Ho_Chi_Minh', label: 'GMT+7 (Việt Nam)' },
          { value: 'UTC', label: 'UTC' }
        ]}
      />
      <Switch
        label="Bật nhật ký hoạt động"
        description="Lưu lại các hoạt động của người dùng"
      />
    </Stack>
  );
}; 