export interface ClassConfig {
    major: string;
    semester: string;
    year: string;
}


export function loadClassConfig(): ClassConfig {
    const config = localStorage.getItem("classConfig");
    if (config) {
        return JSON.parse(config);
    }

    return {
        year: "",
        semester: "",
        major: "",
    };
}