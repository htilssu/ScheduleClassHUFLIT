import React, {useState} from 'react';

export interface AppConfig {
    appName: string;
}

function useAppConfig() {
    const [config, setConfig] = useState<AppConfig>({
        appName: process.env.NEXT_PUBLIC_APP_NAME || 'My App',
    });

    return config;
}

export default useAppConfig;