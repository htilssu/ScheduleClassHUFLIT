'use client'

import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import {FaFacebook, FaInstagramSquare, FaGithub} from "react-icons/fa";
import contact from "./Contact.json";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { MdContactMail } from "react-icons/md";

// Tải Lottie chỉ trên client-side
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type ContactProps = {};

const Contact: React.FC<ContactProps> = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '', // Đổi username thành email để rõ nghĩa hơn
        subject: 'Hỗ trợ', // Mặc định là "Hỗ trợ"
        message: '',
    });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [isSending, setIsSending] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
        setErrors((prev) => ({ ...prev, [id]: '' })); // Xóa lỗi khi người dùng nhập
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: '', email: '', message: '' };

        if (!formData.name) {
            newErrors.name = 'Vui lòng nhập tên của bạn';
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = 'Vui lòng nhập email';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
            isValid = false;
        }
        if (!formData.message) {
            newErrors.message = 'Vui lòng nhập nội dung tin nhắn';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSending(true);
        const { name, email, subject, message } = formData;

        // Giả lập gửi email
        setTimeout(() => {
            window.location.href = `mailto:tuanmeo980provip@gmail.com?subject=${subject} from ${name}&body=${message} (Email: ${email})`;
            setIsSending(false);
            setSentSuccess(true);
            setFormData({ name: '', email: '', subject: 'Hỗ trợ', message: '' });
            setTimeout(() => setSentSuccess(false), 3000);
        }, 1000);
    };

    return (
        <section id='contact' className="z-50 py-10 px-5 md:px-0 ">
            {/* Background image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/images/bg-white-orange-and-blue.png)',
                    backgroundAttachment: 'fixed',
                    opacity: 2,
                    zIndex: 0,
                }}
            />
            <div className='mb-16 max-w-7xl mx-auto relative'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='md:w-1/2 mb-8 ml-2 md:mb-0'>
                        <h2 className='text-3xl font-extrabold mb-3 text-gray-900'>Get in Touch</h2>
                        <p className='mb-4 text-gray-900'>We are always open to new opportunities and collaboration. Feel
                            free to reach out!</p>
                        <div className='flex space-x-4'>
                            <a href="https://www.facebook.com/htilssu.88" className='text-foreground/60 hover:text-foreground/80'>
                                <FaFacebook size={40}
                                            className='w-12 text-blue-500 cursor-pointer transition-transform transform hover:scale-110'/>
                            </a>
                            <a href="#" className='text-foreground/60 hover:text-foreground/80'>
                                <FaInstagramSquare size={40}
                                                   className='w-12 text-red-500 cursor-pointer transition-transform transform hover:scale-110'/>
                            </a>
                            <a href="https://github.com/Tuan980Blue" className='text-foreground/60 hover:text-foreground/80'>
                                <FaGithub size={40}
                                            className='w-12 text-gray-800 cursor-pointer transition-transform transform hover:scale-110'/>
                            </a>
                        </div>
                        <Lottie animationData={contact} className='w-[350px] mx-auto lg:w-[500px]'/>
                    </div>
                    <form
                        className='w-full md:w-1/2 bg-white rounded-lg border border-orange-300 shadow-lg shadow-orange-500/50 p-10'>
                        <h1 className='text-orange-500 text-4xl font-bold flex justify-center items-center gap-4'><MdContactMail /> Contact Us</h1>
                        {sentSuccess && (
                            <p className="text-green-500 mb-4">Tin nhắn đã được gửi thành công!</p>
                        )}
                        <div className='py-4'>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-800'>Your Name</label>
                            <Input
                                type="text"
                                id='name'
                                placeholder='Full Name'
                                className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="username" className='block text-sm font-medium text-gray-800'>Your
                                Email</label>
                            <Input
                                type="email"
                                id='username'
                                placeholder='Email'
                                className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 '
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-800">Chủ đề</label>
                            <select
                                id="subject"
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                                value={formData.subject}
                                onChange={handleInputChange}
                            >
                                <option value="Hỗ trợ">Hỗ trợ</option>
                                <option value="Hợp tác">Hợp tác</option>
                                <option value="Phản hồi">Phản hồi</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="message" className='block text-sm font-medium text-gray-800'>Message
                                Content</label>
                            <textarea
                                id='message'
                                placeholder='Enter Your Message'
                                className='mt-1 p-2 block w-full rounded-md border-orange-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50'
                                value={formData.message}
                                onChange={handleInputChange}
                            />
                            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>
                        <Button
                            className="text-white hover:text-gray-100 border-orange-200 bg-orange-500"
                            onClick={handleSendMessage}
                            disabled={isSending}
                        >
                            <div className="font-medium text-lg">{isSending ? 'Đang gửi...' : 'Gửi tin nhắn'}</div>
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;