import React from "react";
import {Metadata} from "next";
import {AuthProvider} from "@/context/AuthContext";
import {MantineProvider} from "@mantine/core";
import "@/app/globals.css";
import "@mantine/core/styles.css"
import CacheProvider from "@/components/CacheProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: 'Home',
    description: '',
}

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body>
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