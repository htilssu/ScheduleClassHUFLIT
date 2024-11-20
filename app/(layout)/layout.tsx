import React from "react";
import {Metadata} from "next";
import {AuthProvider} from "@/context/AuthContext";
import {MantineProvider} from "@mantine/core";
import "@/app/globals.css";
import "@mantine/core/styles.css"
import Layout from "@/components/Layout";
import CacheProvider from "@/components/CacheProvider";

export const metadata: Metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <CacheProvider>
            <AuthProvider>
                <MantineProvider>
                    <Layout>
                        {children}
                    </Layout>
                </MantineProvider>
            </AuthProvider>
        </CacheProvider>
        </body>
        </html>
    )
}