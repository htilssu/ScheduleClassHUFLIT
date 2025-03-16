"use client"

import React, {useEffect} from 'react';


interface ClientPageProps {
    title?: string;
    children?: React.ReactNode;
}

const ClientPage = (props: ClientPageProps) => {
    useEffect(() => {
        if (typeof props.title === "string") {
            document.title = props.title;
        }
    });

    return (
        <>
            {props.children}
        </>
    );
};

export default ClientPage;