import React, {useEffect, useState} from 'react';
import {Button, Group, Select, Stack} from "@mantine/core";
import {IconDeviceFloppy, IconTrash} from "@tabler/icons-react";
import {Major, Semester, YearStudy} from '@prisma/client';
import {apiRequest} from "@/services/apiRequest";
import {useForm} from "@mantine/form";

interface ActionBarProps {
    setCurrentYear: (value: (((prevState: string) => string) | string)) => void,
    setCurrentSemester: (value: (((prevState: string) => string) | string)) => void,
    setCurrentMajor: (value: (((prevState: string) => string) | string)) => void
}

function ActionBar({setCurrentYear, setCurrentSemester, setCurrentMajor}: ActionBarProps) {
    const [major, setMajor] = useState<Major[]>()
    const [studyYear, setStudyYear] = useState<YearStudy[]>()
    const [semester, setSemester] = useState<Semester[]>()

    const form = useForm({
        initialValues: {
            major: "",
            year: "",
            semester: ""
        }
    })

    useEffect(() => {
        setCurrentMajor(form.values.major)
        setCurrentSemester(form.values.semester)
        setCurrentYear(form.values.year)
    }, [setCurrentMajor, form.values.major, setCurrentSemester, form.values.semester, setCurrentYear, form.values.year]);

    useEffect(() => {
        apiRequest.get("/api/major").then(res => {
            if (res.status === 200) {
                return res.data
            }
        }).then(data => {
            setMajor(data)
        });

        apiRequest.get("/api/studyYear").then(res => {
            setStudyYear(res.data)
        });

        apiRequest.get("/api/semester").then(res => {
            setSemester(res.data)
        });

    }, []);

    return (
        <div className={"p-2"}>
            <div className="bg-gray-200 h-14 rounded-md flex justify-end items-center p-3">
                <Group className={"mr-4"}>
                    <Select {...form.getInputProps("major")} data={major?.map(value => value.name)}
                            placeholder={major ? "Chọn chuyên ngành" : "Loading..."}/>
                    <Select {...form.getInputProps("year")} placeholder={studyYear ? "Chọn năm học" : "Loading..."}
                            data={studyYear?.map(value => value.year)}/>
                    <Select {...form.getInputProps("semester")} placeholder={semester ? "Chọn học kỳ" : "Loading..."}
                            data={semester?.map(value => value.semester)}/>
                </Group>
                <Button rightSection={<IconTrash/>} color="red"
                        className="mr-2 hover:bg-red-500 text-center">Reset</Button>
                <Button rightSection={<IconDeviceFloppy/>} color="blue" className="text-center"
                        variant="filled">Lưu</Button>
            </div>
        </div>
    );
}

export default ActionBar;