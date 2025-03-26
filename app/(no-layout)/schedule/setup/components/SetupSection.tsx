'use client';

import React, {useCallback, useEffect} from 'react';
import {isNotEmpty, useForm} from '@mantine/form';
import {useRouter} from 'next/navigation';
import {get} from '@/lib/utils/request';
import {loadClassConfig} from '@/lib/utils/class';
import {FaArrowRight, FaBook, FaCalendarAlt, FaGraduationCap} from 'react-icons/fa';
import {Button} from "@/components/ui/button";
import {Select} from '@mantine/core';
import {Major, Semester, YearStudy} from "@prisma/client";

function SetupSection() {
    const form = useForm({
        initialValues: loadClassConfig(), // Load cấu hình mặc định
        validate: {
            major: isNotEmpty('Vui lòng chọn chuyên ngành'),
            year: isNotEmpty('Vui lòng chọn năm học'),
            semester: isNotEmpty('Vui lòng chọn học kỳ'),
        }
    });
    const router = useRouter();

    // State lưu dữ liệu từ API
    const [major, setMajor] = React.useState<Major[] | null>(null);
    const [studyYear, setStudyYear] = React.useState<YearStudy[] | null>(null);
    const [semester, setSemester] = React.useState<Semester[] | null>(null);

    // Hàm lưu cấu hình vào localStorage và cookie
    const handleSaveClassConfig = useCallback(() => {
        localStorage.setItem('classConfig', JSON.stringify(form.values));
        document.cookie = `classConfig=${JSON.stringify(form.values)}; path=/; max-age=31536000`; // Lưu 1 năm
    }, [form.values]);

    // Gọi API khi component mount
    useEffect(() => {
        get<Major[]>('/v1/major').then((res) => setMajor(res.data));
        get<YearStudy[]>('/v1/studyYear').then((res) => setStudyYear(res.data));
        get<Semester[]>('/v1/semester').then((res) => setSemester(res.data));
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
                        <Select
                            {...form.getInputProps('major')}
                            data={major?.map((m) => m.name)}
                            placeholder={major == null ? "Loading..." : "Chọn chuyên ngành"}
                            value={form.values.major}
                            disabled={major == null}
                            onChange={(value) => {
                                if (!value) return;
                                form.setFieldValue('major', value)
                            }}
                            className="mt-1"
                            classNames={{
                                input: '!border !border-orange-500',
                            }}
                        />

                    </div>

                    <div className="relative">
                        <label className="text-lg font-medium text-orange-500 flex items-center gap-2">
                            <FaCalendarAlt className="text-white"/> Năm học
                        </label>
                        <Select
                            {...form.getInputProps('year')}
                            value={form.values.year}
                            placeholder={studyYear == null ? "Loading..." : "Chọn năm học"}
                            disabled={studyYear == null}
                            onChange={(value) => {
                                if (!value) return;
                                form.setFieldValue('year', value)
                            }}
                            data={studyYear?.map((year) => year.year)}
                            className="mt-1"
                            classNames={{
                                input: '!border !border-orange-500',
                            }}
                        />
                    </div>


                    <div className="relative">
                        <label className="text-lg font-medium text-orange-500 flex items-center gap-2">
                            <FaBook className="text-white"/> Học kỳ
                        </label>
                        <Select
                            className={'mt-1'}
                            {...form.getInputProps('semester')}
                            value={form.values.semester}
                            disabled={semester == null}
                            placeholder={semester == null ? "Loading..." : "Chọn học kỳ"}
                            data={semester?.map((sem: { semester: any }) => sem.semester)}
                            onChange={(value) => {
                                if (!value) return;
                                form.setFieldValue('semester', value)
                            }}
                            classNames={{
                                input: '!border !border-orange-500',
                            }}
                        />

                    </div>

                    {/*Nút Tiếp tục */}
                    <Button
                        onClick={() => {
                            const formValidationResult = form.validate();
                            if (formValidationResult.hasErrors) return;
                            handleSaveClassConfig();
                            router.push('/schedule');
                        }}
                        className="w-full bg-orange-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-md"
                    >Tiếp tục<FaArrowRight/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SetupSection;