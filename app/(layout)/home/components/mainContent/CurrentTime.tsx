'use client'

import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const CurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    const formattedDate = currentTime.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="relative w-80 bg-orange-500 p-6 rounded-2xl overflow-hidden shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            {/* Gradient background động */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 opacity-75 animate-gradient-x"></div>

            {/* Layer overlay */}
            <div className="absolute inset-0 bg-orange-500/80 backdrop-blur-sm"></div>

            {/* Nội dung */}
            <div className="relative z-10">
                {/* Tiêu đề */}
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 tracking-wider">
                    <FaClock/>
                    Thời Gian Hiện Tại
                </h2>

                {/* Thời gian */}
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200 mb-3 tracking-tight">
                    {formattedTime}
                </div>

                {/* Ngày tháng */}
                <div className="text-base font-medium text-gray-200 capitalize opacity-90 border-t border-gray-700/50 pt-2">
                    {formattedDate}
                </div>
            </div>

            {/* Hiệu ứng hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
        </div>
    );
};

// Thêm animation trong CSS (cần thêm vào file CSS hoặc thẻ style)
const styles = `
    @keyframes gradient-x {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 15s ease infinite;
    }
    .animate-spin-slow {
        animation: spin-slow 10s linear infinite;
    }
`;

export default CurrentTime;