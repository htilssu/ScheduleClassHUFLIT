'use client'

import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqItems: FAQItem[] = [
        {
            question: "Khi nào thì gói được kích hoạt?",
            answer: "Gói sẽ được kích hoạt ngay sau khi thanh toán thành công. Bạn sẽ nhận được email xác nhận và có thể sử dụng các tính năng của gói ngay lập tức."
        },
        {
            question: "Có hoàn tiền nếu hủy không?",
            answer: "Chúng tôi có chính sách hoàn tiền trong vòng 7 ngày nếu bạn không hài lòng với dịch vụ. Vui lòng liên hệ với chúng tôi để được hỗ trợ."
        },
        {
            question: "Làm sao để thay đổi gói?",
            answer: "Bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào từ trang cài đặt tài khoản. Thay đổi sẽ được áp dụng vào kỳ thanh toán tiếp theo."
        },
        {
            question: "Có hỗ trợ trường ABC không?",
            answer: "Chúng tôi đang hỗ trợ tất cả các trường đại học trong hệ thống. Nếu trường của bạn chưa được hỗ trợ, vui lòng liên hệ với chúng tôi để được thông báo khi có cập nhật."
        },
        {
            question: "Gói VIP có giới hạn số môn không?",
            answer: "Gói VIP không giới hạn số lượng môn học và lịch học. Bạn có thể đăng ký tất cả các môn học cần thiết cho kỳ học của mình."
        }
    ];

    return (
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Câu hỏi thường gặp
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className="border border-orange-200 rounded-lg overflow-hidden"
                    >
                        <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center bg-orange-50 hover:bg-orange-100 transition-colors"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <span className="font-semibold text-gray-900">{item.question}</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {openIndex === index && (
                            <div className="px-6 py-4 bg-white">
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ; 