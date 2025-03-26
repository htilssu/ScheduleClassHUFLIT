"use client"

import React, {useEffect} from 'react';


interface ClientPageProps {
    title: string,
    children?: React.ReactNode,
    description?: string
}

const ClientPage = (props: ClientPageProps) => {
    useEffect(() => {
        document.title = props.title;
    });

    return (
        <>
            {props.children}
        </>
    );
};

export default ClientPage;