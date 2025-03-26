import {ReactNode} from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Xếp lịch học',
}

const Layout = async ({children}: Readonly<{ children: ReactNode }>) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;