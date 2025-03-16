export interface ClassConfig {
    major: string;
    semester: string;
    year: string;
}


export function loadClassConfig(): ClassConfig {
    if (typeof window !== 'undefined') {
        const config = localStorage.getItem("classConfig");
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