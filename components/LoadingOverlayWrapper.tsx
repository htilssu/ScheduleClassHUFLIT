import React from 'react';
import {LoadingOverlay} from "@mantine/core";
import {useSelector} from "react-redux";
import {LoadingState, RootState} from "@/lib/state";

function LoadingOverlayWrapper() {
    const loadingState = useSelector<RootState, LoadingState>(state => state.loading);

    return (
        <LoadingOverlay visible={loadingState.loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>
    );
}

export default LoadingOverlayWrapper;