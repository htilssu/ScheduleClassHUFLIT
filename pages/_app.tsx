import type {AppProps} from 'next/app'
import Head from "next/head";
import '@mantine/core/styles.css';
import '../app/globals.css'
import {AuthProvider} from "@/contexts/AuthContext";
import React from "react";
import Layout from "@/components/Layout";
import {createTheme, MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const theme = createTheme({
    fontFamily: 'Montserrat, sans-serif',
    defaultRadius: 'md',
});

export default function MyApp({Component, pageProps}: AppProps) {


    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Head>
                        <title>Xếp lịch HUFLIT</title>
                        <meta name="description" content="Xếp lịch HUFLIT"/>
                    </Head>

                    <MantineProvider theme={theme}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </MantineProvider>
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </>
    )
}

