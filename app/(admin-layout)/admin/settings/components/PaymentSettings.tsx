import { Stack, Select, NumberInput } from '@mantine/core';

export const PaymentSettings = () => {
  return (
    <Stack>
      <Select
        label="Phương thức thanh toán"
        data={[
          { value: 'momo', label: 'Momo' },
          { value: 'vnpay', label: 'VNPAY' },
          { value: 'paypal', label: 'PayPal' },
          { value: 'stripe', label: 'Stripe' }
        ]}
        multiple
      />
      <NumberInput
        label="Phí vận chuyển"
        min={0}
      />
      <NumberInput
        label="Thuế VAT (%)"
        min={0}
        max={100}
      />
    </Stack>
  );
}; 