import { Stack, TextInput } from '@mantine/core';

export const IntegrationSettings = () => {
  return (
    <Stack>
      <TextInput
        label="Google Analytics ID"
        placeholder="UA-XXXXXXXXX-X"
      />
      <TextInput
        label="Facebook Pixel ID"
        placeholder="XXXXXXXXXX"
      />
      <TextInput
        label="Tawk.to Widget ID"
        placeholder="Widget ID"
      />
      <TextInput
        label="API Key"
        placeholder="Nhập API key"
      />
    </Stack>
  );
}; 