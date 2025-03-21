'use client'

import React, {useState} from 'react';
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";
import {post} from "@/lib/utils/request";
import {Menu, X} from 'lucide-react'
import Logo from '../public/images/LogoT&H.png';
import Image from "next/image";

function Navbar() {

    const [mobileMenuOpen, setmMobileMenuOpen] = useState(false)
    const {user} = useAuth();

    function logout() {
        post(origin + '/v1/auth/logout', {action: 'logout'}).then(() => {
            localStorage.setItem("token", "")
            window.location.href = '/';
        });
    }

    return (
        <header
            className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-0'>
            <div className=' max-w-7xl mx-auto flex h-14 lg:h-16 items-center'>
                <div className="flex items-center justify-between w-full px-4 md:px-0">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                        <Image
                            src={Logo}
                            alt="Logo"
                            className="w-11 md:w-14 lg:w-16 h-auto transition-all duration-300"
                            priority
                        />
                    </Link>

                    {/* Navigation */}
                    <nav
                        className="hidden md:flex items-center justify-center flex-1 space-x-4 lg:space-x-8 text-base lg:text-lg font-medium">
                        <Link
                            href="/"
                            className="text-gray-900 hover:text-orange-400 transition-colors duration-200 whitespace-nowrap px-2 py-1 rounded-md hover:bg-gray-700"
                        >
                            Trang Chủ
                        </Link>
                        <Link
                            href="/schedule"
                            className="text-gray-900 hover:text-orange-400 transition-colors duration-200 whitespace-nowrap px-2 py-1 rounded-md hover:bg-gray-700"
                        >
                            Xếp Lịch
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-900 hover:text-orange-400 transition-colors duration-200 whitespace-nowrap px-2 py-1 rounded-md hover:bg-gray-700"
                        >
                            Liên Hệ
                        </Link>
                    </nav>

                    {/* Auth Button */}
                    <div className="flex-shrink-0">
                        {user ? (
                            <button
                                className="px-3 py-1 cursor-pointer rounded-md bg-orange-500 text-white hover:text-white flex items-center gap-1
               shadow-[0_0_5px_#FFA500,0_0_10px_#ffffff,inset_0_0_2px_#FFDAB9] border-2 border-orange-700 transition-all
               hover:bg-orange-600 hover:shadow-[0_0_15px_#FFA500,0_0_5px_#ffffff]"
                            >
                                Đăng xuất
                            </button>
                        ) : (
                            <Link href="/auth">
                                <button
                                    className="px-3 py-1 cursor-pointer rounded-md bg-orange-500 text-white hover:text-white flex items-center gap-1
               shadow-[0_0_5px_#FFA500,0_0_10px_#ffffff,inset_0_0_2px_#FFDAB9] border-2 border-orange-700 transition-all
               hover:bg-orange-600 hover:shadow-[0_0_15px_#FFA500,0_0_5px_#ffffff]"
                                >
                                    Đăng nhập
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                <button className='inline-flex items-center justify-center rounded-md md:hidden'
                        onClick={() => setmMobileMenuOpen(!mobileMenuOpen)}>
                    <span className='sr-only'>Open main menu</span>
                    {mobileMenuOpen ? (
                        <X className='h-6 w-6' aria-hidden="true"/>
                    ) : (
                        <Menu className='h-6 w-6' aria-hidden="true"/>
                    )}
                </button>
            </div>
            {mobileMenuOpen && (
                <div className='md:hidden'>
                    <div className='space-y-1 px-2 pb-3 pt-2'>
                        <Link
                            href="/"
                            className='block rounded-md px-3 py-2 text-base font-medium text-orange-500 hover:bg-gray-800 hover:text-red-400'
                        >
                            Trang Chủ
                        </Link>
                        <Link
                            href="/schedule"
                            className='block rounded-md px-3 py-2 text-base font-medium text-orange-500 hover:bg-gray-800 hover:text-red-400'
                        >
                            Xếp Lịch
                        </Link>
                        <Link
                            href="/contact"
                            className='block rounded-md px-3 py-2 text-base font-medium text-orange-500 hover:bg-gray-800 hover:text-red-400'
                        >
                            Liên Hệ
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
        ;
}

export default Navbar;