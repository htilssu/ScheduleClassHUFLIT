import React from 'react';
import StepTimeline from "@/app/(layout)/direction/components/StepTimeline";

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
                {/* Nội dung chính */}
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-6xl py-8">
                        <StepTimeline />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectionPage;