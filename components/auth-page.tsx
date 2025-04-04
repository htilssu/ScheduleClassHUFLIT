"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/TwMerge";
import { RegisterForm } from "@/app/(no-layout)/auth/components/RegisterForm";
import { LoginForm } from "@/app/(no-layout)/auth/components/LoginForm";
import Image from "next/image";
import Logo from "@/public/images/LogoT&H.png";
import Link from "next/link";

export function AuthPageComponent() {
  const [isLogin, setIsLogin] = useState(true);

  // Hàm chuyển đổi sang tab đăng nhập
  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    // <div className="flex items-center justify-center min-h-screen">
    //     <div className="flex w-full max-w-6xl h-screen">
    //         <div className="w-1/2 pr-8 hidden md:block relative">
    //             <img
    //                 src="/images/HUFLIT-hoc-mon.png"
    //                 alt="Large image"
    //                 className="w-full h-full object-cover rounded-xl fixed top-0 left-0"
    //                 style={{ maxHeight: '100vh', maxWidth: '50%' }}
    //             />
    //         </div>
    //
    //         <div className="md:w-1/2 w-full md:px-1 px-3 flex items-center justify-center">
    //             <div
    //                 className={cn(
    //                     "w-full max-w-md p-8 space-y-8 bg-white rounded-xl",
    //                     "shadow-lg shadow-orange-200/50 ring-1 ring-orange-100",
    //                     "transform transition-all duration-300 hover:shadow-xl hover:shadow-orange-300/50"
    //                 )}
    //             >
    //                 <div className="relative">
    //                     <div className={"flex justify-center items-center"}>
    //                         <Link href="/" className="flex items-center space-x-2 shrink-0">
    //                             <Image
    //                                 src={Logo}
    //                                 alt="Logo"
    //                                 className="w-11 md:w-14 lg:w-16 h-auto transition-all duration-300"
    //                                 priority
    //                             />
    //                         </Link>
    //                     </div>
    //                     <div
    //                         className={cn(
    //                             "flex rounded-lg bg-orange-50/50 p-1",
    //                             "border border-orange-200/80"
    //                         )}
    //                     >
    //                         <button
    //                             className={cn(
    //                                 "flex-1 py-2 text-sm font-medium transition-all duration-200 rounded-md",
    //                                 isLogin
    //                                     ? "bg-white text-orange-500 shadow-xs shadow-orange-200/50"
    //                                     : "text-gray-500 hover:text-orange-400"
    //                             )}
    //                             onClick={() => setIsLogin(true)}
    //                         >
    //                             Đăng nhập
    //                         </button>
    //                         <button
    //                             className={cn(
    //                                 "flex-1 py-2 text-sm font-medium transition-all duration-200 rounded-md",
    //                                 !isLogin
    //                                     ? "bg-white text-orange-500 shadow-xs shadow-orange-200/50"
    //                                     : "text-gray-500 hover:text-orange-400"
    //                             )}
    //                             onClick={() => setIsLogin(false)}
    //                         >
    //                             Đăng ký
    //                         </button>
    //                     </div>
    //                     <div
    //                         className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300 ease-in-out"
    //                         style={{
    //                             width: "50%",
    //                             transform: `translateX(${isLogin ? "0%" : "100%"})`,
    //                         }}
    //                     />
    //                 </div>
    //
    //                 {isLogin ? (
    //                     <LoginForm
    //                         username={username}
    //                         password={password}
    //                         onUsernameChange={handleChangeUserName}
    //                         onPasswordChange={handleChangePassword}
    //                         onSubmit={handleLogin}
    //                     />
    //                 ) : (
    //                     <RegisterForm/>
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/Cover-Web-Tuyen-sinh-13.02.png)",
          opacity: 0.7,
          zIndex: 0,
        }}
      />
      {/* Nội dung chính */}
      <div className="relative z-10 flex w-full max-w-6xl px-3 md:px-1">
        <div className="w-full flex   md:pl-8 lg:pl-12">
          <div
            className={cn(
              "w-full max-w-md p-8 space-y-8 bg-white rounded-xl",
              "shadow-xl shadow-orange-300/50 ring-1 ring-orange-200",
              "transform transition-all duration-300 hover:shadow-2xl hover:shadow-orange-400/50"
            )}
          >
            <div className="relative">
              <div className="flex justify-center items-center">
                <Link
                  href="/"
                  className="flex items-center space-x-2 shrink-0"
                >
                  <Image
                    src={Logo}
                    alt="Logo"
                    className="w-11 md:w-14 lg:w-16 h-auto transition-all duration-300"
                    priority
                  />
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold bg-linear-to-r from-gray-800 via-orange-500 to-orange-200 text-transparent bg-clip-text drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 tracking-wide">
                    SCHEDULE
                  </h2>
                </Link>
              </div>
              <div
                className={cn(
                  "flex rounded-lg bg-orange-50/50 p-1",
                  "border border-orange-200/80"
                )}
              >
                <button
                  className={cn(
                    "flex-1 py-2 text-sm font-medium transition-all duration-200 rounded-md",
                    isLogin
                      ? "bg-white text-orange-500 shadow-xl shadow-orange-200/50"
                      : "text-gray-500 hover:text-orange-400"
                  )}
                  onClick={() => setIsLogin(true)}
                >
                  Đăng nhập
                </button>
                <button
                  className={cn(
                    "flex-1 py-2 text-sm font-medium transition-all duration-200 rounded-md",
                    !isLogin
                      ? "bg-white text-orange-500 shadow-xl shadow-orange-200/50"
                      : "text-gray-500 hover:text-orange-400"
                  )}
                  onClick={() => setIsLogin(false)}
                >
                  Đăng ký
                </button>
              </div>
              <div
                className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300 ease-in-out"
                style={{
                  width: "50%",
                  transform: `translateX(${isLogin ? "0%" : "100%"})`,
                }}
              />
            </div>

            {isLogin ? (
              <LoginForm />
            ) : (
              <RegisterForm onRegisterSuccess={switchToLogin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
