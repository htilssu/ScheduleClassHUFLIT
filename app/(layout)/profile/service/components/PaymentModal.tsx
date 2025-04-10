import React from 'react';
import { Modal, Stack, Card, Group, Text, ThemeIcon, Radio, Divider, TextInput, Button, rem } from "@mantine/core";
import { IconCreditCard, IconBuildingBank, IconQrcode, IconGift } from '@tabler/icons-react';

interface ServiceFeature {
    title: string;
    price: string;
    salePrice: string | null;
    discount: string | null;
    yearlyDiscount: string | null;
    features: string[];
    icon: any;
    color: string;
    status: string;
    yearlyPrice?: string;
    yearlySalePrice?: string;
}

interface PaymentModalProps {
    opened: boolean;
    onClose: () => void;
    selectedService: ServiceFeature | null;
    subscriptionType: 'monthly' | 'yearly';
    setSubscriptionType: (type: 'monthly' | 'yearly') => void;
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    promoCode: string;
    setPromoCode: (code: string) => void;
    onPayment: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    opened,
    onClose,
    selectedService,
    subscriptionType,
    setSubscriptionType,
    paymentMethod,
    setPaymentMethod,
    promoCode,
    setPromoCode,
    onPayment
}) => {
    const getFinalPrice = () => {
        if (!selectedService) return 0;
        const basePrice = subscriptionType === 'monthly' 
            ? selectedService.salePrice 
            : selectedService.yearlySalePrice;
        return basePrice;
    };

    if (!selectedService) return null;

    return (
        <Modal 
            opened={opened} 
            onClose={onClose}
            title="Thanh toán"
            size="lg"
            centered
        >
            <Stack gap="md">
                <Card withBorder>
                    <Group justify="space-between">
                        <Group gap="xs">
                            <ThemeIcon size="lg" color={selectedService.color}>
                                {React.createElement(selectedService.icon, { style: { width: rem(20), height: rem(20) } })}
                            </ThemeIcon>
                            <div>
                                <Text fw={500} size="lg">{selectedService.title}</Text>
                                <Text size="sm" c="dimmed">
                                    {subscriptionType === 'monthly' ? 'Thanh toán theo tháng' : 'Thanh toán theo năm'}
                                </Text>
                            </div>
                        </Group>
                        <Text fw={700} size="lg" c="green">
                            {subscriptionType === 'monthly' ? selectedService.salePrice : selectedService.yearlySalePrice}
                        </Text>
                    </Group>
                </Card>

                <Radio.Group
                    value={subscriptionType}
                    onChange={(value) => setSubscriptionType(value as 'monthly' | 'yearly')}
                    label="Chọn hình thức thanh toán"
                >
                    <Stack mt="xs">
                        <Radio value="monthly" label="Thanh toán theo tháng" />
                        <Radio value="yearly" label="Thanh toán theo năm" />
                    </Stack>
                </Radio.Group>

                <Divider label="Phương thức thanh toán" labelPosition="center" />

                <Radio.Group
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                >
                    <Stack gap="xs">
                        <Radio 
                            value="card" 
                            label={
                                <Group gap="xs">
                                    <IconCreditCard size={20} />
                                    <Text>Thẻ tín dụng/ghi nợ</Text>
                                </Group>
                            }
                        />
                        <Radio 
                            value="bank" 
                            label={
                                <Group gap="xs">
                                    <IconBuildingBank size={20} />
                                    <Text>Chuyển khoản ngân hàng</Text>
                                </Group>
                            }
                        />
                        <Radio 
                            value="qr" 
                            label={
                                <Group gap="xs">
                                    <IconQrcode size={20} />
                                    <Text>Quét mã QR</Text>
                                </Group>
                            }
                        />
                    </Stack>
                </Radio.Group>

                <Group gap="xs">
                    <TextInput
                        placeholder="Nhập mã giảm giá"
                        leftSection={<IconGift size={16} />}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <Button variant="light">Áp dụng</Button>
                </Group>

                <Card withBorder bg="var(--mantine-color-green-0)">
                    <Stack gap="xs">
                        <Group justify="space-between">
                            <Text>Giá gốc:</Text>
                            <Text style={{ textDecoration: 'line-through' }}>
                                {subscriptionType === 'monthly' ? selectedService.price : selectedService.yearlyPrice}
                            </Text>
                        </Group>
                        <Group justify="space-between">
                            <Text>Giảm giá:</Text>
                            <Text c="green" fw={500}>
                                -{subscriptionType === 'monthly' ? selectedService.discount : selectedService.yearlyDiscount}
                            </Text>
                        </Group>
                        <Divider />
                        <Group justify="space-between">
                            <Text fw={700}>Tổng thanh toán:</Text>
                            <Text fw={700} size="lg" c="green">
                                {getFinalPrice()}
                            </Text>
                        </Group>
                    </Stack>
                </Card>

                <Button 
                    size="lg" 
                    fullWidth 
                    color="green"
                    leftSection={<IconCreditCard size={20} />}
                    onClick={onPayment}
                >
                    Thanh toán ngay
                </Button>

                <Text size="sm" c="dimmed" ta="center">
                    Bằng việc thanh toán, bạn đồng ý với các điều khoản và điều kiện của chúng tôi
                </Text>
            </Stack>
        </Modal>
    );
};

export default PaymentModal; 