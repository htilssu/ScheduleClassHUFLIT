'use client'

import React, {useCallback, useEffect} from 'react';
import {Button, Group, Select} from "@mantine/core";
import {get} from "@/lib/utils/request.util";
import {useForm} from "@mantine/form";
import {ChevronsRight} from "lucide-react";
import {loadClassConfig} from '@/lib/utils/class.util';

function SetupSection() {
    const form = useForm({
        initialValues: loadClassConfig()
    });

    const [major, setMajor] = React.useState<any>(null);
    const [studyYear, setStudyYear] = React.useState<any>(null);
    const [semester, setSemester] = React.useState<any>(null);

    const handleSaveClassConfig = useCallback(() => {
        localStorage.setItem("classConfig", JSON.stringify(form.values));
        document.cookie = `classConfig=${JSON.stringify(form.values)}; path=/; max-age=31536000`;
    }, [form.values]);

    useEffect(() => {
        get("/v1/major").then(res => {
            if (res.status === 200) {
                return res.data;
            }
        }).then(data => {
            setMajor(data);
        });

        get("/v1/studyYear").then(res => {
            setStudyYear(res.data);
        });

        get("/v1/semester").then(res => {
            setSemester(res.data);
        });

    }, []);


    return (
        <div className="bg-gray-200 h-full rounded-md flex justify-center items-center p-3">
            <Group className={"mr-4"}>
                <Select  {...form.getInputProps("major")} value={form.values.major}
                         data={major?.map((value: { name: string; }) => value.name)}
                         placeholder={major ? "Chọn chuyên ngành" : "Đang load..."}/>
                <Select  {...form.getInputProps("year")} value={form.values.year}
                         placeholder={studyYear ? "Chọn năm học" : "Đang load..."}
                         data={studyYear?.map((value: { year: any; }) => value.year)}/>
                <Select {...form.getInputProps("semester")} value={form.values.semester}
                        placeholder={semester ? "Chọn học kỳ" : "Đang load..."}
                        data={semester?.map((value: { semester: any; }) => value.semester)}/>
            </Group>
            <Button onClick={handleSaveClassConfig} rightSection={<ChevronsRight/>} color="blue" className="text-center"
                    variant="filled">Tiếp tục</Button>
        </div>
    );
}

export default SetupSection;