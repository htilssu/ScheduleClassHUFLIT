import {ReactNode} from 'react';
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