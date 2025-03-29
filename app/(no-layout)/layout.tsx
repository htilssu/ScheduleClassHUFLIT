import {ReactNode} from 'react';
import "@/app/globals.css"
import "@mantine/core/styles.css"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Xếp lịch học HUFLIT',
}

const Layout = async ({children}: Readonly<{ children: ReactNode }>) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;