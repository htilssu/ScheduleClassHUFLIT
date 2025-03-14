import React, {ReactNode} from 'react';
import "@/app/globals.css"
import "@mantine/core/styles.css"
import CacheProvider from "@/components/CacheProvider";
import {MantineProvider} from '@mantine/core';

const Layout = ({children}: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang={"en"} suppressHydrationWarning>
        <body>
        <CacheProvider>
            <MantineProvider>
                {children}
            </MantineProvider>
        </CacheProvider>
        </body>
        </html>
    );
};

export default Layout;