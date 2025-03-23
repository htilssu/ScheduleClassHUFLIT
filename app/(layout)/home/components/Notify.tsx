'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBell, FaFacebook, FaHospitalSymbol } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";

const Notify = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    // Dữ liệu slides chứa ảnh và link
    const slides = [
        {
            image: "/images/thongbao01.png",
            link: "https://portal.huflit.edu.vn",
            alt: "Thông báo đăng ký môn học",
        },
        {
            image: "/images/thongbao02.png",
            link: "https://portal.huflit.edu.vn",
            alt: "Thông báo kỳ thi",
        },
        {
            image: "/images/thongbao03.png",
            link: "https://portal.huflit.edu.vn",
            alt: "Thông báo hội thảo",
        },
        {
            image: "/images/thongbao04.png",
            link: "https://portal.huflit.edu.vn",
            alt: "Thông báo sự kiện",
        },
    ];

    // Tự động chuyển slide mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const handleDotClick = (index: React.SetStateAction<number>) => {
        setSlideIndex(index);
    };

    return (
        <div className="w-full bg-white hidden lg:block p-6 rounded-xl shadow-lg border-t-2 border-orange-500 shadow-orange-300/50 transition-all duration-300 hover:shadow-orange-400/70">
            {/* Tiêu đề với icon */}
            <div className="flex items-center gap-3 mb-5">
                <FaBell className="text-orange-500 text-2xl animate-pulse" />
                <h3 className="text-xl font-bold text-orange-500 tracking-tight">Thông Báo Quan Trọng</h3>
            </div>

            {/* Slider thông báo */}
            <div className="relative slides overflow-hidden rounded-lg">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`transition-opacity duration-500 ${
                            index === slideIndex ? "block opacity-100" : "hidden opacity-0"
                        }`}
                    >
                        <Link href={slide.link} target="_blank" className="block">
                            <Image
                                src={slide.image}
                                alt={slide.alt}
                                width={300}
                                height={150}
                                className="w-full h-[200px] object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Dots điều hướng */}
            <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
                            index === slideIndex
                                ? "bg-orange-500 scale-125"
                                : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    ></span>
                ))}
            </div>

            {/* Thông tin khác */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 tracking-wide">Thông Tin Khác</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 group">
                        <Image
                            src="/images/Logo-Portal.png"
                            alt="Logo Portal"
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <Link
                            href="https://portal.huflit.edu.vn/"
                            className="text-gray-700 text-sm hover:text-orange-500 transition-colors duration-200 group-hover:underline"
                        >
                            Portal Huflit
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 group">
                        <IoSchoolSharp className="text-red-500 text-xl group-hover:scale-110 transition-transform duration-200" />
                        <Link
                            href="https://courses.huflit.edu.vn"
                            className="text-gray-700 text-sm hover:text-orange-500 transition-colors duration-200 group-hover:underline"
                        >
                            Coursera Huflit
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 group">
                        <FaFacebook className="text-blue-600 text-xl group-hover:scale-110 transition-transform duration-200" />
                        <Link
                            href="https://www.facebook.com/huflit.edu.vn"
                            className="text-gray-700 text-sm hover:text-orange-500 transition-colors duration-200 group-hover:underline"
                        >
                            Facebook Chính Thức
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 group">
                        <FaHospitalSymbol className="text-cyan-500 text-xl group-hover:scale-110 transition-transform duration-200" />
                        <Link
                            href="https://portal.huflit.edu.vn/News/Type/1015"
                            className="text-gray-700 text-sm hover:text-orange-500 transition-colors duration-200 group-hover:underline"
                        >
                            Kí Hiệu Phòng Học
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notify;