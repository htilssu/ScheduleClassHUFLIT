'use client'

import React, {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {store} from "@/lib/state";
import {Box, MantineProvider} from "@mantine/core";
import {Provider} from "react-redux";
import LoadingOverlayWrapper from './LoadingOverlayWrapper';

export const queryClient = new QueryClient()

const RootWrapper = ({children}: Readonly<{ children: ReactNode }>) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <MantineProvider>
                    <Box className={"relative"}>
                        <LoadingOverlayWrapper/>
                        {children}
                    </Box>
                </MantineProvider>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

export default RootWrapper;