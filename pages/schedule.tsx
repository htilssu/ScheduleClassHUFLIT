import React, {useEffect} from 'react';
import TimeLine from "@/components/TimeLine";
import ActionBar from "@/components/ActionBar";
import SelectSection from "@/components/SelectSection";
import {useRouter} from "next/router";
import {useAuth} from "@/contexts/AuthContext";

function Schedule() {

    const router = useRouter()
    const {user, loading} = useAuth()

    useEffect(() => {
        if (!user && !loading) {
            router.push('/auth').then()
        }
    }, [user, router, loading])

    return (
        <div>
            {user && <div>
                <ActionBar/>
                <div className={"flex p-2"}>
                    <SelectSection/>
                    <TimeLine/>
                </div>
            </div>}
        </div>
    );
}

export default Schedule;