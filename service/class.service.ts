import {get} from "@/util/request.util";

export async function getClass(major: string, semester: string,
                               year: string) {
    return (await get(`/v1/class?studyYear=${year}&semester=${semester}&major=${major}`)).data;
}