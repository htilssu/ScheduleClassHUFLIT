'use client'

import React, { useState, useEffect } from "react";

const CurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Cập nhật thời gian mỗi giây
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // Định dạng thời gian
    const formattedTime = currentTime.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const formattedDate = currentTime.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="w-72 bg-gradient-to-br from-orange-200 via-orange-400 to-orange-500 p-6 rounded-xl shadow-lg shadow-orange-400/50 text-white transform hover:scale-105 transition-all duration-300">
            {/* Tiêu đề */}
            <h2 className="text-lg font-semibold tracking-wide mb-3 flex items-center gap-2">
                <span className="text-2xl animate-pulse">⏰</span> Thời Gian Hiện Tại
            </h2>

            {/* Thời gian */}
            <div className="text-4xl font-bold tracking-tight mb-2">
                {formattedTime}
            </div>

            {/* Ngày tháng */}
            <div className="text-sm font-medium capitalize opacity-90">
                {formattedDate}
            </div>

            {/* Hiệu ứng ánh sáng */}
            <div className="absolute inset-0 rounded-xl bg-orange-300 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
};

export default CurrentTime;