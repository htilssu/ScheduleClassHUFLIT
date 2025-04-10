'use client'

import React, { useState } from 'react';
import { Stack, Grid } from "@mantine/core";
import { IconStar, IconCrown, IconRocket } from '@tabler/icons-react';
import ServiceCard from './components/ServiceCard';
import PaymentModal from './components/PaymentModal';
import ServiceHeader from './components/ServiceHeader';
import { ServiceFeature } from './types';

const ServicePage = () => {
    const [opened, setOpened] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceFeature | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [subscriptionType, setSubscriptionType] = useState<'monthly' | 'yearly'>('monthly');
    const [promoCode, setPromoCode] = useState('');

    const services: ServiceFeature[] = [
        {
            title: "Gói Cơ Bản",
            price: "0đ",
            features: ["Xem lịch học", "Tìm kiếm môn học", "Xem thông tin lớp"],
            icon: IconStar,
            color: "blue",
            status: "Đang sử dụng",
            salePrice: null,
            discount: null,
            yearlyDiscount: null
        },
        {
            title: "Gói Premium",
            price: "39.000đ/tháng",
            salePrice: "29.000đ/tháng",
            discount: "20%",
            yearlyDiscount: "40%",
            features: ["Tất cả tính năng gói cơ bản", "Thông báo lịch học", "Xuất lịch PDF", "Tùy chỉnh giao diện"],
            icon: IconCrown,
            color: "yellow",
            status: "Nâng cấp",
            yearlyPrice: "468.000đ/năm",
            yearlySalePrice: "280.800đ/năm"
        },
        {
            title: "Gói Pro",
            price: "49.000đ/tháng",
            salePrice: "39.000đ/tháng",
            discount: "20%",
            yearlyDiscount: "40%",
            features: ["Tất cả tính năng Premium", "Tích hợp Google Calendar", "API Access", "Hỗ trợ 24/7"],
            icon: IconRocket,
            color: "grape",
            status: "Nâng cấp",
            yearlyPrice: "588.000đ/năm",
            yearlySalePrice: "352.800đ/năm"
        }
    ];

    const handleUpgrade = (service: ServiceFeature) => {
        setSelectedService(service);
        setOpened(true);
    };

    const handlePayment = () => {
        // Handle payment logic here
        console.log('Processing payment...', {
            service: selectedService,
            subscriptionType,
            paymentMethod,
            promoCode
        });
    };

    return (
        <>
            <Stack gap="xl">
                <ServiceHeader />
                <Grid>
                    {services.map((service, index) => (
                        <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                            <ServiceCard 
                                service={service} 
                                onUpgrade={handleUpgrade}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Stack>

            <PaymentModal 
                opened={opened}
                onClose={() => setOpened(false)}
                selectedService={selectedService}
                subscriptionType={subscriptionType}
                setSubscriptionType={setSubscriptionType}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                onPayment={handlePayment}
            />
        </>
    );
};

export default ServicePage;