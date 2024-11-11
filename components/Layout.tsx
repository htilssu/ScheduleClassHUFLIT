'use client'
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {useRouter} from "next/navigation";

function Layout({children}: { children: React.ReactNode }) {

    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}

export default Layout;