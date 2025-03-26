import React from 'react';

const StepTimeline = () => {
    const steps = [
        {
            title: 'Bước 1: Đăng ký & Đăng nhập',
            body: 'Để lịch học của bạn có thể lưu lại.',
            imgSrc: 'images/step01.png',
        },
        {
            title: 'Bước 2: Chọn các chức năng',
            body: (
                <>
                    <p>- Nhập tên rút gọn.</p>
                    <p>
                        - <span className="text-orange-600 font-medium">Không</span> đặt tiết tránh quá nhiều.
                    </p>
                </>
            ),
            inverted: true,
            imgSrc: 'images/step02.png',
        },
        {
            title: 'Bước 3: Thiết lập cài đặt',
            body: 'Đặt số tiết học của cả tổ.',
            imgSrc: 'images/step03.png',
        },
        {
            title: 'Bước 4: Kéo thả các lớp học',
            body: 'Đặt số tiết/ngày nghỉ của giáo viên.',
            inverted: true,
            imgSrc: 'images/step03.png',
        },
        {
            title: 'Bước 5: Lịch học',
            body: (
                <>
                    <p>- Thêm các khối/nhóm lớp có chương trình tương tự nhau.</p>
                    <p>- Đặt tiết nghỉ cho toàn khối nếu cần thiết.</p>
                </>
            ),
            imgSrc: 'images/step04.png',
        }
    ];

    return (
        <div>
            <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute w-1 bg-orange-300 h-full left-1/2 transform -translate-x-1/2 z-0"></div>

                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`flex items-center mb-8 ${
                            step.inverted ? 'flex-row-reverse' : 'flex-row'
                        } justify-center`}
                    >
                        {/* Timeline Badge */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 border-4 border-white z-10 transition-transform transform hover:scale-125"></div>

                        {/* Timeline Panel */}
                        <div
                            className={`w-5/12 mx-6 p-6 bg-white rounded-xl shadow-lg border-l-4 border-orange-400 transition-all duration-300 hover:shadow-xl ${
                                step.inverted ? 'mr-6' : 'ml-6'
                            }`}
                        >
                            <h6 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h6>
                            <div className="text-gray-600 leading-relaxed">{step.body}</div>
                            <img
                                src={step.imgSrc}
                                alt={step.title}
                                className="mt-4 w-full h-auto object-cover rounded-lg border border-gray-200"
                            />
                        </div>

                        {/* Spacer for inverted side */}
                        <div className="w-5/12"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepTimeline;