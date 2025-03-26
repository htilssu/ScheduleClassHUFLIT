import React from "react";
import {Metadata} from "next";
import {AuthProvider} from "@/context/AuthContext";
import {MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css"
import "@/app/globals.css";
import RootWrapper from "@/components/RootWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {roboto} from "@/lib/fonts";


export const metadata: Metadata = {
    title: 'Trang chủ',
    description: '',
}


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={roboto.className} suppressHydrationWarning={true} >
        <RootWrapper>
            <AuthProvider>
                <MantineProvider>
                    <Navbar/>
                    {children}
                    <Footer/>
                </MantineProvider>
            </AuthProvider>
        </RootWrapper>
        </body>
        </html>
    )
}