'use client'

import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import {FaFacebook, FaInstagramSquare, FaGithub} from "react-icons/fa";
import contact from "./Contact.json";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

// Tải Lottie chỉ trên client-side
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type ContactProps = {};

const Contact: React.FC<ContactProps> = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { name, email, message } = formData;

        if (name && email && message) {
            window.location.href = `mailto:tuanmeo980provip@gmail.com?subject=New Message from ${name}&body=${message} (Email: ${email})`;
            // Optional: Reset form after submission
            setFormData({ name: '', email: '', message: '' });
        }
    };

    return (
        <section id='contact' className="z-50 relative py-10 px-5 md:px-0 ">
            <div className='mb-16 max-w-7xl mx-auto'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='md:w-1/2 mb-8 ml-2 md:mb-0'>
                        <h2 className='text-3xl font-extrabold mb-3 text-gray-800'>Get in Touch</h2>
                        <p className='mb-4 text-gray-600'>We are always open to new opportunities and collaboration. Feel
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
                        <h1 className='text-gray-800 text-4xl font-bold mb-7'>Contact Us</h1>
                        <div className='mb-4'>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-800'>Your Name</label>
                            <Input
                                type="text"
                                id='name'
                                placeholder='Full Name'
                                className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-800'>Your
                                Email</label>
                            <Input
                                type="email"
                                id='email'
                                placeholder='Email'
                                className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
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
                        </div>
                        <Button
                            className="text-white hover:text-gray-100 border-orange-200"
                            onClick={handleSendMessage}
                        >
                            <div className="font-medium text-lg">Send Message</div>
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;