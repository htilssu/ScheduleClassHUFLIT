'use client'

import { useState } from 'react';
import PricingCard from './PricingCard';
import PricingToggle from './PricingToggle';
import FAQ from './FAQ';

const Purchase = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    const pricingData = {
        free: {
            title: "Gói Cơ bản",
            price: 0,
            annualPrice: 0,
            originalPrice: 0,
            annualOriginalPrice: 0,
            discountPercent: 0,
            annualDiscountPercent: 0,
            features: [
                "Tự lên lịch học bằng tay",
                "Có giới hạn số lượng môn/lịch học lưu trữ",
                "Không hỗ trợ AI",
                "Có watermark \"Made with Xếp Lịch Free\""
            ],
            icon: "🎒",
            color: "from-orange-100 to-white",
            buttonColor: "bg-orange-400 hover:bg-orange-500 text-white",
            popular: false
        },
        pro: {
            title: "AI Xếp Hộ",
            price: 39000,
            annualPrice: 29900,
            originalPrice: 49000,
            annualOriginalPrice: 39000,
            discountPercent: 20,
            annualDiscountPercent: 23,
            features: [
                "AI tự động đề xuất lịch tối ưu",
                "Tính toán dựa theo sở thích",
                "Lưu không giới hạn lịch học",
                "Giao diện không quảng cáo",
                "Hỗ trợ qua email/chatbot"
            ],
            icon: "🤖",
            color: "from-orange-200 to-orange-300",
            buttonColor: "bg-gray-200 hover:bg-gray-300 text-orange-400",
            popular: true
        },
        vip: {
            title: "Xếp & Đăng Ký Full Auto",
            price: 79000,
            annualPrice: 59900,
            originalPrice: 99000,
            annualOriginalPrice: 79000,
            discountPercent: 20,
            annualDiscountPercent: 24,
            features: [
                "Tự động đăng ký môn học",
                "Ưu tiên lịch ít tiết trống",
                "Thống kê xếp hạng lịch học",
                "Hỗ trợ trực tiếp 1:1",
                "Không watermark + ưu tiên tính năng mới"
            ],
            icon: "👑",
            color: "from-yellow-200 to-red-300",
            buttonColor: "bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white",
            popular: false
        }
    };

    // @ts-ignore
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center gap-8">
                    <h1 className="text-xl md:text-3xl font-bold text-gray-900 md:mb-2 mb-1">
                        Xếp Lịch Thông Minh Cho Sinh Viên
                    </h1>
                    <p className="md:text-xl text-lg text-gray-600 md:mb-8 mb-2">
                        Chọn gói phù hợp với nhu cầu của bạn
                    </p>
                </div>

                <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />

                <div className="md:mt-12 mt-8 grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                    <PricingCard
                        plan="free"
                        data={pricingData.free}
                        isAnnual={isAnnual}
                    />
                    <PricingCard
                        plan="pro"
                        data={pricingData.pro}
                        isAnnual={isAnnual}
                    />
                    <PricingCard
                        plan="vip"
                        data={pricingData.vip}
                        isAnnual={isAnnual}
                    />
                </div>

                <FAQ />
            </div>
        </div>
    );
};

export default Purchase;