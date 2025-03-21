import React from 'react';
import { FaCalendarAlt, FaPlayCircle } from 'react-icons/fa';
import Link from "next/link";

const Intro = () => {
    return (
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight sm:text-5xl md:text-6xl">
                    <span className="block xl:inline text-gray-800 font-extrabold">Welcom...<br/></span>{' '}
                    <span className={`block text-orange-500 xl:inline font-extrabold`}>
            Schedule Huflit
          </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Quản lý lịch học, lịch thi và sự kiện của bạn tại HUFLIT một cách dễ dàng, nhanh chóng và hiệu quả. Hãy để chúng tôi đồng hành cùng bạn trên hành trình học tập!
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                        <a
                            href={"/schedule"}
                            className={`w-full flex items-center justify-center px-8 py-3 border border-orange-500 text-white font-medium rounded-md bg-orange-400 hover:bg-orange-500 hover:text-gray-50 md:py-4 md:text-lg md:px-10`}
                        >
                            <FaCalendarAlt className="mr-2" />
                            Schedule Now
                        </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link
                            href={"https://www.youtube.com/watch?v=LJwUT_n_D5k&list=RDLJwUT_n_D5k&start_radio=1"}
                            className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-orange-500 text-orange-500 bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
                        >
                            <FaPlayCircle className="mr-2"/>
                            Watch Demo
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Intro;
