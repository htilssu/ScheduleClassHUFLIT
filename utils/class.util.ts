import {ClassRoot} from "@/app/(layout)/schedule/page";
import {trim} from "lodash";

export function isOverlap(classList: ClassRoot[], addClass: ClassRoot) {
    const xClass = classList.find(value => {
        const classTime = getClassTime(value);
        const start = classTime[0];
        const end = classTime[1];
        const addClassTime = getClassTime(addClass);
        const addStart = addClassTime[0];
        const addEnd = addClassTime[1];

        return value.weekDay === addClass.weekDay && start <= addStart && addStart <= end || start <= addEnd && addEnd <= end;
    });

    return xClass !== null && xClass !== undefined;
}


export function getWeekDay(cl: ClassRoot) {
    return Number(cl.weekDay[1]);
}

export function getClassTime(cl: ClassRoot) {
    return cl.time.split('-').map(trim).map(Number);
}