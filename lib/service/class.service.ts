import {get} from "@/lib/utils/request.util";
import {ClassRoot} from "@/app/(layout)/schedule/page";
import {Class} from "@prisma/client";

/**
 * Fetches class data from the server.
 * @param major major name
 * @param semester semester name
 * @param year year name
 */
export async function getClass(major: string, semester: string,
                               year: string) {
    return (await get(`/v1/class?studyYear=${year}&semester=${semester}&major=${major}`)).data;
}

/**
 * Save scheduled classes to local storage.
 * @param classes Array of classes to save.
 */
export function saveClassToLocal(classes: Class[]) {
    localStorage.setItem("classes", JSON.stringify(classes));
}

/**
 * Load scheduled classes from local storage.
 */
export function loadClassFromLocal(): ClassRoot[] {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("classes") ?? "[]");
    }
    return [];
}