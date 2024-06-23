import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {useRouter} from "next/router";

function Layout({children}: { children: React.ReactNode }) {
    const location = useRouter();
    if (location.pathname === "/auth") {
        return (
            <div>
                {children}
            </div>
        );
    }

    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}

export default Layout;