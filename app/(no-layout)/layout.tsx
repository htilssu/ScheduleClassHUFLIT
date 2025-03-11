import React, {ReactNode} from 'react';
import "@/app/globals.css"
import CacheProvider from "@/components/CacheProvider";

const Layout = ({children}: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang={"en"} suppressHydrationWarning >
        <body>
        <CacheProvider>
            {children}
            <p><div></div></p>
        </CacheProvider>
        </body>
        </html>
    );
};

export default Layout;