'use client';

import React, {useCallback, useEffect} from 'react';
import {useForm} from '@mantine/form';
import {useRouter} from 'next/navigation';
import {get} from '@/lib/utils/request';
import {loadScheduleConfig} from '@/lib/utils/schedule_config';
import {FaArrowRight, FaBook, FaCalendarAlt, FaGraduationCap} from 'react-icons/fa';
import {Button} from "@/components/ui/button";

function SetupSection() {
    const form = useForm({
        initialValues: loadScheduleConfig(),
    });
    const router = useRouter();

    // State lưu dữ liệu từ API
    const [major, setMajor] = React.useState<any>(null);
    const [studyYear, setStudyYear] = React.useState<any>(null);
    const [semester, setSemester] = React.useState<any>(null);

    // Hàm lưu cấu hình vào localStorage và cookie
    const handleSaveClassConfig = useCallback(() => {
        localStorage.setItem('classConfig', JSON.stringify(form.values));
        document.cookie = `classConfig=${JSON.stringify(form.values)}; path=/; max-age=31536000`; // Lưu 1 năm
    }, [form.values]);

    // Gọi API khi component mount
    useEffect(() => {
        get('/v1/major').then((res) => setMajor(res.data));
        get('/v1/studyYear').then((res) => setStudyYear(res.data));
        get('/v1/semester').then((res) => setSemester(res.data));
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Background image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/images/bg-setup.png)',
                    zIndex: 0,
                }}
            />

            {/* Form container với hiệu ứng mờ và trong suốt */}
            <div
                className="relative bg-gray-800/90 shadow-2xl rounded-2xl p-8 w-full max-w-lg transform transition-all  border border-orange-200/50 z-10">
                {/* Tiêu đề */}
                <h1 className="text-3xl font-bold text-center text-white mb-6 flex items-center justify-center gap-2">
                    <FaGraduationCap className="text-white"/> Thiết lập cài đặt
                </h1>

                {/* Form chọn thông tin */}
                <div className="space-y-6">
                    {/* Chọn chuyên ngành */}
                    <div className="relative">
                        <label className="text-lg font-medium text-orange-500 flex items-center gap-2">
                            <FaBook className="text-white"/> Chuyên ngành
                        </label>
                        <select
                            {...form.getInputProps('major')}
                            value={form.values.major || ''}
                            onChange={(e) => form.setFieldValue('major', e.target.value)}
                            className="mt-1 block w-full p-3 border border-orange-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-orange-600"
                        >
                            <option value="" disabled>
                                {major ? 'Chọn chuyên ngành' : 'Đang tải...'}
                            </option>
                            {major?.map((value: { name: string }, index: number) => (
                                <option key={index} value={value.name}>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Chọn năm học */}
                    <div className="relative">
                        <label className="text-lg font-medium text-orange-500 flex items-center gap-2">
                            <FaCalendarAlt className="text-white"/> Năm học
                        </label>
                        <select
                            {...form.getInputProps('year')}
                            value={form.values.year || ''}
                            onChange={(e) => form.setFieldValue('year', e.target.value)}
                            className="mt-1 block w-full p-3 border border-orange-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-orange-600"
                        >
                            <option value="" disabled>
                                {studyYear ? 'Chọn năm học' : 'Đang tải...'}
                            </option>
                            {studyYear?.map((value: { year: any }, index: number) => (
                                <option key={index} value={value.year}>
                                    {value.year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Chọn học kỳ */}
                    <div className="relative">
                        <label className="text-lg font-medium text-orange-500 flex items-center gap-2">
                            <FaBook className="text-white"/> Học kỳ
                        </label>
                        <select
                            {...form.getInputProps('semester')}
                            value={form.values.semester || ''}
                            onChange={(e) => form.setFieldValue('semester', e.target.value)}
                            className="mt-1 block w-full p-3 border border-orange-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-orange-600"
                        >
                            <option value="" disabled>
                                {semester ? 'Chọn học kỳ' : 'Đang tải...'}
                            </option>
                            {semester?.map((value: { semester: any }, index: number) => (
                                <option key={index} value={value.semester}>
                                    {value.semester}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nút Tiếp tục */}
                    <Button
                        onClick={() => {
                            handleSaveClassConfig();
                            router.push('/schedule');
                        }}
                        className="w-full bg-orange-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-md"
                    >
                        Tiếp tục <FaArrowRight/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SetupSection;