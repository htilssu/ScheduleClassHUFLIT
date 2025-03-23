import React from "react";
import { Button } from "@/components/ui/button"; // Giả sử bạn dùng shadcn/ui
import { AiOutlineSchedule } from "react-icons/ai";
import Image from "next/image";

const QuickSchedule = () => {
    return (
        <div className="relative w-full bg-white p-6 rounded-xl shadow-lg shadow-gray-200/50 border-t-4 border-orange-500 overflow-hidden transform hover:shadow-xl transition-all duration-300">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/bgSchedule.png"
                    alt="Background"
                    fill
                    loading={'lazy'}
                    className="opacity-100 blur-sm"
                />
                <div className="absolute inset-0 bg-gray-900/10"></div> {/* Overlay để nội dung nổi bật */}
            </div>

            {/* Nội dung */}
            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <AiOutlineSchedule className="text-white text-2xl" />
                    Lịch Học Nhanh
                </h2>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-inner">
                    <p className="text-gray-600">[Bạn chưa có lịch nào]</p>
                    <p className="text-orange-500 italic mt-2 text-sm">
                        Đăng nhập để lịch học của bạn được lưu nhé!
                    </p>
                </div>
                <Button
                    className="mt-6"
                >
                    Xem Lịch Đã Xếp
                </Button>
            </div>
        </div>
    );
};

export default QuickSchedule;