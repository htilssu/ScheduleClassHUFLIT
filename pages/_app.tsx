import type {AppProps} from 'next/app'
import Head from "next/head";
import '../app/globals.css'
import {AuthProvider} from "@/contexts/AuthContext";


export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
          <AuthProvider>
              <Head>
                  <title>Xếp lịch HUFLIT</title>
                  <meta name="description" content="Xếp lịch HUFLIT"/>
              </Head>
              <Component {...pageProps} />
          </AuthProvider>
        </>
    )
}

