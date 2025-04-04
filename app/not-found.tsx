'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
    const [countdown, setCountdown] = useState(30);
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "Có vẻ như bạn đã lạc đường. Đừng lo, chúng tôi sẽ đưa bạn về nhà!";

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    window.location.href = '/';
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let currentIndex = 0;
        let frameId: number;

        const animateText = () => {
            setTimeout(() => {
                if (currentIndex < fullText.length) {
                    setDisplayedText(fullText.slice(0, currentIndex + 1));
                    currentIndex++;
                    frameId = requestAnimationFrame(animateText);
                } else {
                    cancelAnimationFrame(frameId);
                }
            }, 40);
        };

        frameId = requestAnimationFrame(animateText);

        return () => cancelAnimationFrame(frameId);
    }, []);


    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full p-8 text-center transform transition-all duration-300">
                <div className="relative lg:w-64 lg:h-64 w-32 h-32 mx-auto">
                    <Image
                        src="/images/LogoT&H.png"
                        alt="404 Illustration"
                        fill
                        className="object-cover rounded-full"
                    />
                </div>

                <h1 className="text-6xl font-extrabold mb-4 flex items-center justify-center gap-1 animate-pulse">
                    <span
                        className="text-transparent bg-clip-text bg-linear-to-r from-orange-700 to-orange-600">4</span>
                    <span
                        className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-orange-500">0</span>
                    <span
                        className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-400">4</span>
                </h1>

                {/* Thông báo với icon */}
                <h2 className="text-2xl font-semibold text-orange-600 mb-2 flex items-center justify-center gap-2">
                    <i className="fas fa-map-signs"></i>
                    Oops! Trang không tìm thấy
                </h2>
                <p className="text-gray-600 mb-6">
                    {displayedText}
                    <span className="animate-blink">|</span>
                </p>

                {/* Bộ đếm ngược với icon */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="xl:text-sm text-lg text-gray-700 flex items-center gap-2">
                        <i className="fas fa-hourglass-half"></i>
                        Tự động về Trang Chủ sau:
                    </span>
                    <span
                        className="xl:w-8 xl:h-8 w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full font-bold xl:text-sm text-lg">
                        {countdown}
                    </span>
                </div>

                {/* Nút điều hướng với icon */}
                <div className="flex justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-300 transform gap-2"
                    >
                        <i className="fas fa-home"></i>
                        Quay về Trang Chủ
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex border border-e border-orange-500 items-center px-4 py-2 text-orange-500 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300 transform gap-2"
                    >
                        <i className="fas fa-headset"></i>
                        Liên hệ Hỗ Trợ
                    </Link>
                </div>
            </div>
        </div>
    );
}