import {Class, LearningSection, Subject} from "@prisma/client";
import {load} from "cheerio";

export type ClassExtractData = Class & {
    id: string;
    subjectId: string;
    lectureName: string;
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
        majorId: "",
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const splitData = htmlInner.split(/<br\/?>/g);
    const subjectName = splitData[0].split(":")[1].trim() //Bảo đảm chất lượng phần mềm (1230534)
    const subjectId = getSubjectIdFromSubjectName(subjectName);

    data.name = subjectName;
    data.id = subjectId

    return data
}

export function getClassDataFromRaw(rawData: string): ClassExtractData[] {
    const $ = load(rawData);
    let result: {}[] = [];

    const tr = $("tbody tr");
    let prevClass: ClassExtractData | null = null;
    tr.each((_, element) => {
        if (prevClass !== null) {
            const td = $(element).find("td");
            if (td.length < 4) return;
            const learningSection: LearningSection = {
                weekDay: "",
                time: "",
                room: ""
            }

            prevClass = {...prevClass}
            learningSection.time = td.eq(0).text().trim();
            learningSection.weekDay = td.eq(1).text().trim();
            learningSection.room = td.eq(2).text().trim();
            prevClass.learningSection.push(learningSection);
            result.push({...prevClass});
            prevClass = null;
        }
        let temp: ClassExtractData = {
            id: "", 
            lectureName: "", 
            subjectId: "", 
            learningSection: [],
            classId: "",
            type: "",
            yearStudyId: "",
            semesterId: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            lecturerId: ""
        }
        const td = $(element).find("td");
        if (td.length < 10) return;
        td.each((index, element) => {
            const currentElement = $(element);
            const learningSection: LearningSection = {
                weekDay: "",
                time: "",
                room: ""
            }
            switch (index) {
                case 1:
                    temp.subjectId = currentElement.text().trim()
                    const attr = currentElement.attr("rowspan");
                    if (attr && attr === "2") {
                        prevClass = temp;
                    }
                    break;
                case 2:
                    temp.id = currentElement.text().trim();
                    break;
                case 5:
                    temp.type = currentElement.text().trim();
                    break;
                case 7:
                    learningSection.time = currentElement.text().trim();
                    break;
                case 8:
                    learningSection.weekDay = currentElement.text().trim()
                    break;
                case 10:
                    learningSection.room = currentElement.text().trim()
                    break;
                case 11:
                    temp.lectureName = currentElement.text().trim()
                                                     .replace("  ", " ")
                    break;
            }

            temp.learningSection.push(learningSection)
        });
    });

    return result as ClassExtractData[];
}
