import React from "react";
import {Metadata} from "next";
import {AuthProvider} from "@/context/AuthContext";
import {MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css"
import "@/app/globals.css";
import CacheProvider from "@/components/CacheProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {roboto} from "@/lib/fonts";


export const metadata: Metadata = {
    title: 'Trang chủ',
    description: '',
}


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={roboto.className}>
        <CacheProvider>
            <AuthProvider>
                <MantineProvider>
                    <Navbar/>
                    {children}
                    <Footer/>
                </MantineProvider>
            </AuthProvider>
        </CacheProvider>
        </body>
        </html>
    )
}