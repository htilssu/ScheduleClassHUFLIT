import {Subject} from "@prisma/client";
import {load} from "cheerio";

type ClassData = {
    id: string;
    name: string;
    subjectId: string;
    subjectName: string;
    lectureName: string;
    type: string,
    weekDay: string;
    room: string;
    time: string;
}

function getSubjectIdFromSubjectName(subjectName: string) {
    const splitData = subjectName.split("(")
    const rawSubjectId = splitData[splitData.length - 1].trim()
    return rawSubjectId.slice(0, rawSubjectId.length - 1)
}

export function getSubjectDataFromRaw(htmlInner: string): Subject {
    //-Môn: Bảo đảm chất lượng phần mềm (1230534)r-Lớp: PM2205<br/>-Tiết: 7->9<br/>-Phòng: HA08PM08<br/>-GV: Tiếu Phùng Mai Sương<br/>-Nội dung:
    const data: Subject = {
        name: "",
        id: "",
        subjectCode: "",
        majorId: "",
        classId: [],
        yearStudyId: "",
        semesterId: "",
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const splitData = htmlInner.split(/<br\/?>/g);
    const subjectName = splitData[0].split(":")[1].trim() //Bảo đảm chất lượng phần mềm (1230534)
    const subjectId = getSubjectIdFromSubjectName(subjectName);

    data.name = subjectName;
    data.subjectCode = subjectId

    return data
}

export function getClassDataFromRaw(rawData: string): ClassData[] {
    const $ = load(rawData);
    let result: {}[] = [];

    const tr = $("tbody tr");
    let prevClass: ClassData | null = null;
    tr.each((_, element) => {
        if (prevClass !== null) {
            const td = $(element).find("td");
            if (td.length < 4) return;

            prevClass = {...prevClass}
            result.push({...prevClass});
            prevClass = null;
        }
        let temp: ClassData = {
            id: "",
            name: "",
            subjectId: "",
            subjectName: "",
            lectureName: "",
            type: "",
            weekDay: "",
            room: "",
            time: ""
        }
        const td = $(element).find("td");
        if (td.length < 10) return;
        td.each((index, element) => {
            const currentElement = $(element);
            switch (index) {
                case 1:
                    temp = {...temp, subjectId: currentElement.text().trim()}
                    const attr = currentElement.attr("rowspan");
                    if (attr && attr === "2") {
                        prevClass = temp as ClassData;
                    }
                    break;
                case 2:
                    temp.id = currentElement.text().trim();
                    break;
                case 5:
                    temp.type = currentElement.text().trim();
                    break;
                case 7:
                    temp.time = currentElement.text().trim();
                    break;
                case 8:
                    temp.weekDay = currentElement.text().trim()
                    break;
                case 10:
                    temp.room = currentElement.text().trim()
                    break;
                case 11:
                    temp.lectureName = currentElement.text().trim()
                            .replace("  ", " ")
                    break;
            }
        });

        result.push(temp);
    });


    return result as ClassData[];
}

