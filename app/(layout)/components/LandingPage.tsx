import React from 'react';
import Intro from "@/app/(layout)/components/Intro";
import ImgHuflit from "@/app/(layout)/components/ImgHuflit";

const LandingPage = () => {
    return (
        <div>
            <div className={`bg-background`}>
                <div className="max-w-7xl mx-auto relative">
                    <div
                        className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
                    >
                        <svg
                            className={`hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-background transform translate-x-1/2`}
                            fill="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="50,0 100,0 50,100 0,100"/>
                        </svg>
                        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">

                        </div>
                        <Intro/>
                    </div>
                    <ImgHuflit/>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;