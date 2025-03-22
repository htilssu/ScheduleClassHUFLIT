import React from "react";
import Link from "next/link";

const ScheduleRegistration = () => {
    const courses = [
        {
            name: "Lập trình Web",
            lecturer: "Tran Trung Hieu",
            time: "T2, 8:00 - 10:00",
            credits: 3,
        },
        {
            name: "Cơ sở dữ liệu",
            lecturer: "Nguyen Anh Tuan",
            time: "T4, 13:00 - 15:00",
            credits: 3,
        },
    ];

    return (
        <div
            className="w-full bg-white p-6 rounded-xl shadow-lg shadow-gray-200/50 border border-gray-200 transform hover:shadow-xl transition-all duration-300">
            {/* Tiêu đề */}
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-orange-500 text-xl">📚</span> Đăng Ký Môn Học
            </h2>

            {/* Bộ lọc */}
            <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-medium text-gray-600 bg-orange-100 px-3 py-1 rounded-full">
          Gợi ý
        </span>
                <div className="flex gap-3">
                    <select
                        className="p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                    >
                        <option>Khoa</option>
                        <option>Công nghệ thông tin</option>
                        <option>Kinh tế</option>
                    </select>
                    <select
                        className="p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                    >
                        <option>Chuyên ngành</option>
                        <option>Công nghệ thông tin</option>
                        <option>Kinh tế</option>
                    </select>
                    <select
                        className="p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                    >
                        <option>Kỳ học</option>
                        <option>Kỳ 01</option>
                        <option>Kỳ 02</option>
                        <option>Kỳ 03</option>
                    </select>
                    <select
                        className="p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                    >
                        <option>Năm học</option>
                        <option>2025-2026</option>
                        <option>2024-2025</option>
                        <option>2023-2024</option>
                    </select>
                </div>
            </div>

            {/* Danh sách môn học */}
            <div className="grid grid-cols-2 gap-5">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all duration-300 group"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                            {course.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Giảng viên:</span> {course.lecturer}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Thời gian:</span> {course.time}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Tín chỉ:</span> {course.credits}
                        </p>
                        <Link href={"/schedule"} className={"flex"}>
                            <button
                                className="mt-4 w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-500 hover:to-orange-600 focus:ring-2 focus:ring-orange-300 transition-all duration-200">
                                Xếp Lịch Ngay
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScheduleRegistration;