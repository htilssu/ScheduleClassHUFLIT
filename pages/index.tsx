"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import {get} from "@/services/apiRequest";

function Index() {

    async function test() {

        const a = await get(window.location.origin + "/api/auth/login", {email: "12313123"})
        console.log(a)
    }

    return (
        <div>
            <Navbar/>
            <button onClick={() => {
                test()
            }}>Click me
            </button>
        </div>
    );
}

export default Index;