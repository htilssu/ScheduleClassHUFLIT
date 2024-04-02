import React, {useEffect, useRef, useState} from 'react';
import {ScrollArea, Select} from "@mantine/core";
import {useRouter} from "next/router";
import {apiRequest} from "@/services/apiRequest";
import {Class, Major} from "@prisma/client";
import {useForm} from "@mantine/form";
import {classDummy} from "@/dummy";
import ClassCard from "@/components/ClassCard";

function SelectSection() {
    const [major, setMajor] = useState<undefined | Major[]>(undefined)
    const router= useRouter()
    const form = useForm({
        initialValues: {
            major: ""
        }
    })
    const classes: Class[] = classDummy;

    useEffect(() => {
        apiRequest.get("/api/major").then(res => {
            if (res.status === 200) {
                return res.data
            } else {
                router.push("/auth").then()
            }
        }).then(data => {
            setMajor(data)
        });
    }, [router]);


    return (
        <div className={"w-1/3 max-h-[100vh] flex flex-col p-2 bg-gray-100 rounded-md"}>
            <h1 className={"text-center text-lg font-bold text-amber-800"}>Tùy chọn</h1>
            <Select data={major?.map(value => value.name)} label={"Chọn chuyên ngành"} placeholder={major ? "Chọn chuyên ngành" : "Loading..."}/>


            <ScrollArea className={"overflow-x-hidden"}>
                {classes.map(value => <ClassCard classData={value} key={value.id}/>)}
            </ScrollArea>

        </div>
    );
}

export default SelectSection;