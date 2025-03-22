import React from "react";
import {FaRobot, FaBell, FaHeadset, FaSyncAlt} from "react-icons/fa"; // Import icon từ react-icons

const KeyFeatures = () => {
    const features = [
        {icon: <FaRobot/>, text: "Xếp lịch tự động", color: "text-blue-500"},
        {icon: <FaBell/>, text: "Thông báo nhắc nhở", color: "text-orange-500"},
        {icon: <FaHeadset/>, text: "Hỗ trợ 24/7", color: "text-green-500"},
        {icon: <FaSyncAlt/>, text: "Đồng bộ hóa", color: "text-purple-500"},
    ];

    return (
        <div
            className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg shadow-gray-200/50 border-t-2 border-orange-500 transform hover:shadow-xl transition-all duration-300">
            {/* Tiêu đề */}
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-orange-500 text-xl">✨</span> Tính Năng Nổi Bật
            </h2>

            {/* Danh sách tính năng */}
            <div className="grid grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="cursor-pointer group flex flex-col items-center text-center p-4 rounded-lg bg-gray-100 hover:bg-orange-100 hover:shadow-md transition-all duration-300"
                    >
                        <span
                            className={`${feature.color} text-3xl mb-3 group-hover:scale-110 transition-transform duration-200`}>
                            {feature.icon}
                        </span>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors duration-200">
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KeyFeatures;