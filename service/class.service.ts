import {get} from "@/util/request.util";
import {ClassRoot} from "@/app/(layout)/schedule/page";

export async function getClass(major: string, semester: string,
                               year: string) {
    return (await get(`/v1/class?studyYear=${year}&semester=${semester}&major=${major}`)).data;
}

export function saveClassToLocal(classes: ClassRoot[]) {
    localStorage.setItem("classes", JSON.stringify(classes));
}

export function loadClassFromLocal() {
    return JSON.parse(localStorage.getItem("classes") || "[]") as ClassRoot[];
}