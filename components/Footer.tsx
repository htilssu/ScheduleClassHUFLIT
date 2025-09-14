"use client";

import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import Image from "next/image";
import useAppConfig from "@/lib/hook/use-app-config";

const Footer = () => {
  const config = useAppConfig();
  return (
    <footer className="py-10 text-white relative bg-gray-900 ">
      <div className="container max-w-full px-6">
        <div className="flex flex-wrap justify-between items-start mb-8">
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="flex items-center mb-4">
              <Image
                src={"/favicon.ico"}
                width={64}
                height={64}
                alt="Logo"
                className="w-16 h-16 rounded-full shadow-lg border-2 border-orange-500"
              />
              <h3 className="text-2xl uppercase font-bold ml-3 text-white">
                {config.appName}
              </h3>
            </div>
            <p className="text-gray-200">
              {config.appName} - Công cụ xếp lịch học thông minh, giúp sinh viên
              quản lý thời gian học tập hiệu quả.
            </p>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <h3 className="text-xl font-bold mb-4 text-orange-600">
              Điều khoản
            </h3>
            <ul className="space-y-2">
              {[
                "Thỏa thuận người dùng",
                "Quyền riêng tư",
                "Quy định - chính sách",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="flex items-center text-gray-200 hover:text-orange-400 transition duration-300 transform hover:translate-x-1"
                  >
                    <IoIosArrowForward
                      size={20}
                      className="hover:text-orange-500"
                    />
                    <span className="ml-2">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <h3 className="text-xl font-bold mb-4 text-orange-600">Hotline</h3>
            <ul className="space-y-2">
              {["Email: tolashuu@gmail.com"].map((item) => (
                <li key={item} className="flex items-center justify-start">
                  <TbPointFilled className={"text-orange-500"} size={18} />
                  <p className="text-gray-200">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <h3 className="text-xl font-bold mb-4 text-orange-600">
              Giới thiệu
            </h3>
            <ul className="space-y-2">
              {["Về chúng tôi", "Tin tức", "Liên hệ"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="flex items-center text-gray-200 hover:text-orange-400 transition duration-300 transform hover:translate-x-1"
                  >
                    <IoIosArrowForward
                      size={20}
                      className="hover:text-orange-500"
                    />
                    <span className="ml-2">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-2 md:mt-4 text-center">
          <h3 className="text-xl font-bold mb-2 text-white">Follow Me</h3>
          <div className="flex md:mt-4 mt-2 justify-center space-x-6">
            <a
              href="https://facebook.com/htilssu.88"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-orange-400 transition duration-300 transform hover:scale-110"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://github.com/htilssu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-orange-400 transition duration-300 transform hover:scale-110"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
