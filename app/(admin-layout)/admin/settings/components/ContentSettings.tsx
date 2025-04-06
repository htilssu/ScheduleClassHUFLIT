import { Stack, NumberInput, TextInput, Textarea, Switch } from '@mantine/core';

export const ContentSettings = () => {
  return (
    <Stack>
      <NumberInput
        label="Số bài viết hiển thị mỗi trang"
        min={1}
        max={50}
      />
      <TextInput
        label="Meta title mặc định"
        placeholder="Nhập meta title"
      />
      <Textarea
        label="Meta description mặc định"
        placeholder="Nhập meta description"
      />
      <Switch
        label="Cho phép bình luận"
        description="Bật/tắt tính năng bình luận"
      />
      <Switch
        label="Tự động đăng bài"
        description="Cho phép lên lịch đăng bài tự động"
      />
    </Stack>
  );
}; 