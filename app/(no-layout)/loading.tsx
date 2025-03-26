'use client'

import React from 'react';
import {HashLoader} from 'react-spinners';

const Loading = () => {

    return (
        <div className={'h-screen flex justify-center items-center'}>
            <HashLoader
                loading={true}
                color="#FF6633"
                speedMultiplier={1}
            />
        </div>
    );
};

export default Loading;