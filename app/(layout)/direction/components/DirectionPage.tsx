import React from 'react';
import StepTimeline from "@/app/(layout)/direction/components/StepTimeline";
import Link from "next/link";
import {FaPlayCircle} from "react-icons/fa";

const DirectionPage = () => {
    return (
        <div>
            <div className="relative min-h-screen">
                {/* Background image */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url(/images/Cover-Web-Tuyen-sinh-13.02.png)',
                        backgroundAttachment: 'fixed',
                        opacity: 0.7,
                        zIndex: 0,
                    }}
                />
                <div className="relative z-10 flex items-center min-h-screen">
                    <div className="w-full max-w-6xl py-8 relative">
                        <StepTimeline/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectionPage;