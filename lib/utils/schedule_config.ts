export interface ScheduleConfig {
    major: string;
    semester: string;
    year: string;
}


export function loadScheduleConfig(): ScheduleConfig {
    if (typeof window !== 'undefined') {
        const config = localStorage.getItem("schedule_config");
        if (config) {
            return JSON.parse(config);
        }
    }

    return {
        year: "",
        semester: "",
        major: "",
    };
}