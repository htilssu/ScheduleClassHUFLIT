import React, {useEffect, useState} from 'react';
import {Select} from "@mantine/core";
import {useRouter} from "next/router";
import {apiRequest} from "@/services/apiRequest";

function SelectSection() {
    const [major, setMajor] = useState<undefined | string[]>(undefined)
    const router= useRouter()

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
        <div className={"w-1/3 p-2 bg-gray-100 rounded-md"}>
            <h1 className={"text-center text-lg font-bold text-amber-800"}>Tùy chọn</h1>
            <Select data={major} label={"Chọn chuyên ngành"} placeholder={major ? "Chọn chuyên ngành" : "Loading..."}/>
        </div>
    );
}

export default SelectSection;