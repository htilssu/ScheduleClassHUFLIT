import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF, FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

const Footer = () => {
    return (
        <footer className="py-10 text-white relative bg-gray-900 ">
            <div className="container max-w-full px-6">
                <div className="flex flex-wrap justify-between items-start mb-8">
                    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                        <div className="flex items-center mb-4">
                            <img
                                src={"/images/zoro-back.png"}
                                alt="Logo"
                                className="w-16 h-16 rounded-full shadow-lg border-2 border-orange-500"
                            />
                            <span className="text-2xl font-bold ml-3 text-white">xeplichhuflit.edu.vn</span>
                        </div>
                        <p className="text-gray-200">
                            Công TTHH 2 thành viên Hieu Tuan Junior @huflit quản lý bởi TH True Company.
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                        <h3 className="text-xl font-bold mb-4 text-orange-600">Điều khoản</h3>
                        <ul className="space-y-2">
                            {["Thỏa thuận người dùng", "Quyền riêng tư", "Quy định - chính sách"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="flex items-center text-gray-200 hover:text-orange-400 transition duration-300 transform hover:translate-x-1"
                                    >
                                        <IoIosArrowForward size={20} className="hover:text-orange-500" />
                                        <span className="ml-2">{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                        <h3 className="text-xl font-bold mb-4 text-orange-600">Hotline</h3>
                        <ul className="space-y-2">
                            {[
                                "Email: devgenZhuflit@gmail.com",
                                "Điện thoại: +84 397 654 789",
                                "Địa chỉ: Số 99 Đường SVH, Quận 13, TP HCM"
                            ].map((item) => (
                                <li key={item} className="flex items-center justify-start">
                                    <TbPointFilled className={"text-orange-500"} size={18}/>
                                    <p className="text-gray-200">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                        <h3 className="text-xl font-bold mb-4 text-orange-600">Giới thiệu</h3>
                        <ul className="space-y-2">
                            {["Về chúng tôi", "Tin tức", "Liên hệ"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="flex items-center text-gray-200 hover:text-orange-400 transition duration-300 transform hover:translate-x-1"
                                    >
                                        <IoIosArrowForward size={20} className="hover:text-orange-500" />
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
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-200 hover:text-orange-400 transition duration-300 transform hover:scale-110"
                        >
                            <FaFacebookF size={24} />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-200 hover:text-orange-400 transition duration-300 transform hover:scale-110"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-200 hover:text-orange-400 transition duration-300 transform hover:scale-110"
                        >
                            <FaTwitter size={24} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-200 hover:text-orange-400 transition duration-300 transform hover:scale-110"
                        >
                            <FaLinkedinIn size={24} />
                        </a>
                    </div>
                </div>

                <div className="text-center mt-6 border-t border-gray-600 pt-4">
                    <p className="text-gray-300 text-sm">
                        Bản quyền © 2024-2035{" "}
                        <span className="text-orange-400 font-medium">devgenZhuflit.com</span>. Hệ
                        thống trực tuyến bảo vệ người dùng hàng đầu Việt Nam.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;