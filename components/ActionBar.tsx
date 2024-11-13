'use client'

import React, {useEffect} from 'react';
import {Button, Group, Select} from "@mantine/core";
import {IconDeviceFloppy, IconTrash} from "@tabler/icons-react";
import {get} from "@/utils/request.util";
import {useForm} from "@mantine/form";
import {useRouter} from "next/navigation";

export interface Filter {
    year: string,
    semester: string,
    major: string,
}

interface ActionBarProps {
    filters: Filter,
}

function ActionBar({filters}: ActionBarProps) {
    const form = useForm({
        initialValues: {
            year: filters.year,
            semester: filters.semester,
            major: filters.major
        }
    });

    const router = useRouter();

    useEffect(() => {
        if (form.values.year === "" && form.values.semester === "" && form.values.major === "") {
            return;
        }

        router.push("?year=" + form.values.year + "&semester=" + form.values.semester + "&major=" + form.values.major)
    }, [form.values.year, form.values.semester, form.values.major]);

    const [major, setMajor] = React.useState<any>(null);
    const [studyYear, setStudyYear] = React.useState<any>(null);
    const [semester, setSemester] = React.useState<any>(null);

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
        <div className={"p-2"}>
            <div className="bg-gray-200 h-14 rounded-md flex justify-end items-center p-3">
                <Group className={"mr-4"}>
                    <Select  {...form.getInputProps("major")} value={form.values.major}
                             data={major?.map((value: { name: string; }) => value.name)}
                             placeholder={major ? "Chọn chuyên ngành" : "Loading..."}/>
                    <Select  {...form.getInputProps("year")} value={form.values.year}
                             placeholder={studyYear ? "Chọn năm học" : "Loading..."}
                             data={studyYear?.map((value: { year: any; }) => value.year)}/>
                    <Select {...form.getInputProps("semester")} value={form.values.semester}
                            placeholder={semester ? "Chọn học kỳ" : "Loading..."}
                            data={semester?.map((value: { semester: any; }) => value.semester)}/>
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