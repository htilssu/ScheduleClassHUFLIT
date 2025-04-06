import { Stack, Select, ColorInput, FileInput } from '@mantine/core';

export const BrandingSettings = () => {
  return (
    <Stack>
      <Select
        label="Theme"
        data={[
          { value: 'light', label: 'Sáng' },
          { value: 'dark', label: 'Tối' },
          { value: 'system', label: 'Theo hệ thống' }
        ]}
      />
      <ColorInput
        label="Màu chủ đạo"
        placeholder="Chọn màu chủ đạo"
        defaultValue="#FF6B00"
      />
      <FileInput
        label="Hình nền"
        placeholder="Chọn hình nền"
        accept="image/*"
      />
      <Select
        label="Font chữ"
        data={[
          { value: 'roboto', label: 'Roboto' },
          { value: 'open-sans', label: 'Open Sans' },
          { value: 'montserrat', label: 'Montserrat' }
        ]}
      />
    </Stack>
  );
}; 