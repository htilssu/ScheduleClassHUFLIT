'use client'

import React, {ReactNode} from 'react';
import "@/app/globals.css"
import "@mantine/core/styles.css"
import CacheProvider from "@/components/CacheProvider";
import {MantineProvider} from '@mantine/core';
import {Provider} from "react-redux";
import {store} from '@/lib/state'

const Layout = ({children}: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang={"en"}>
        <body suppressHydrationWarning={true}>
        <Provider store={store}>
            <CacheProvider>
                <MantineProvider>
                    {children}
                </MantineProvider>
            </CacheProvider>
        </Provider>
        </body>
        </html>
    );
};

export default Layout;