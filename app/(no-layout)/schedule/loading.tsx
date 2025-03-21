'use client'

import React from 'react';
import {HashLoader} from "react-spinners";

const Loading = () => {
    return (
        <div>
            <HashLoader
                loading={true}
                color="#FF6633"
                speedMultiplier={1}
            />
        </div>
    );
};

export default Loading;