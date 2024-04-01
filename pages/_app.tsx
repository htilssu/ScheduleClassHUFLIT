import type {AppProps} from 'next/app'
import Head from "next/head";
import  '@mantine/core/styles.css';
import '../app/globals.css'
import {AuthProvider} from "@/contexts/AuthContext";
import React from "react";
import Layout from "@/components/Layout";
import { MantineProvider, createTheme } from '@mantine/core';
import {Router} from "next/router";



const theme = createTheme({
    fontFamily: 'Montserrat, sans-serif',
    defaultRadius: 'md',
});

export default function MyApp({Component, pageProps}: AppProps) {



    return (
        <>
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
        </>
    )
}

