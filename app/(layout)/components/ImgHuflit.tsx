import React from "react";
import Image from "next/image";

const ImgHuflit = () => {
    return (
        <div className="lg:absolute lg:top-0 lg:right-0 lg:w-1/2 h-full">
            <div className="flex flex-col h-full">
                {/* Ảnh đầu chiếm 2/3 chiều cao tổng */}
                <div className="h-2/3 relative">
                    <Image
                        className="object-center h-76 w-full"
                        src={'/images/HUFLIT-hoc-mon.png'}
                        alt="image"
                        fill
                    />
                </div>
                {/* Ảnh thứ hai chiếm 1/3 chiều cao tổng */}
                <div className="h-1/2 relative">
                    <Image
                        className="w-full h-48 object-center"
                        src={'/images/website_tuyensinh_hocbong.jpg'}
                        alt="image"
                        fill
                    />
                </div>
            </div>
        </div>

    );
};

export default ImgHuflit;
