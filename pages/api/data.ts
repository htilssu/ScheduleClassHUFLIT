// noinspection TypeScriptValidateJSTypes

import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {load} from "cheerio";
import {prisma} from "@/services/prismaClient";
import {getClassDataFromRaw, getSubjectDataFromRaw} from "@/utils/data";
import {randomUUID} from "node:crypto";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await scrapData()
    res.status(200).json({message: "Scraping data"})
}

async function scrapData() {
    const rawData = await axios.get("https://portal.huflit.edu.vn/public/tracuuthoikhoabieu")
    let term = await loadTerm(rawData.data)
    const year = await loadYearStudy(rawData.data)
    term = term.reverse();
    await loadWeek(year, term)
    await loadSubject(year, term)
    await loadClass(year, term)


// console.log(year)
// console.log(classStudent)
// console.log(term)
// console.log(year)


}

async function loadClassStudent(yearStudy: string, term: string) {

    const result = await axios.get(`https://portal.huflit.edu.vn/Public/GetClassStudentByTerm/${yearStudy}$${term}`)
    return result.data;
}

async function loadTerm(rawData: string) {
    const $ = load(rawData)
    const term: string[] = []
    $("#TermID option").each((_, element) => {
        term.push($(element).attr("value")!)
    })

    for (const value of term) {
        const data = await prisma.semester.findUnique({
            where: {
                semester: value
            }
        })


        if (!data) {
            await prisma.semester.create({
                data: {
                    semester: value
                }
            })
        }
    }

    return term
}

async function loadWeek(yearStudy: string[], term: string[]) {
    const data = []

    const scrapYear = yearStudy.filter(value => value.includes(new Date().getFullYear().toString()))

    for (const year of scrapYear) {
        for (const term1 of term) {
            try {
                const result = await axios.get(`https://portal.huflit.edu.vn/Public/GetWeek/${year}$${term1}`) as {
                    data: {
                        Week: number,
                        DisPlayWeek: number,
                    }[]
                }
                data.push(...result.data.map(value => {
                    return {
                        ...value,
                        yearValue: year,
                        semester: term1,
                    }
                }))
            } catch (e) {
            }
        }

    }


    for (const value of data) {
        const data = await prisma.week.findFirst({
            where: {
                yearStudyId: value.yearValue,
                semesterId: value.semester,
                weekValue: value.Week,
                weekName: value.DisPlayWeek
            }

        })


        if (!data) {
            await prisma.week.create({
                data: {
                    weekValue: value.Week,
                    weekName: value.DisPlayWeek,
                    semester: {
                        connectOrCreate: {
                            where: {
                                semester: value.semester
                            },
                            create: {
                                semester: value.semester
                            }
                        }
                    },
                    yearStudy: {
                        connectOrCreate: {
                            where: {
                                year: value.yearValue
                            },
                            create: {
                                year: value.yearValue
                            }
                        }
                    }
                }
            })

        }
    }

    return data
}

async function loadYearStudy(rawDataL: string) {
    const $ = load(rawDataL)
    const year: string[] = []
    $("#YearStudy2 option").each((_, element) => {
        year.push($(element).attr("value")!)
    })

    for (const value of year) {
        const data = await prisma.yearStudy.findUnique({
            where: {
                year: value
            }
        })


        if (!data) {
            await prisma.yearStudy.create({
                data: {
                    year: value
                }
            })
        }
    }

    return year

}

function handlerStudentClass(studentClass: { ClassStudentID: string }[]) {
    const data: String[] = []

    studentClass.map(value => {
        const fourChar = value.ClassStudentID.slice(0, 4)
        if (!data.includes(fourChar)) {
            data.push(fourChar)
        }
    })

    return data;
}

async function loadSubject(yearStudy: string[], term: string[]) {

    const existSubjectId: String[] = [];
    const currentYear = new Date().getFullYear();

    const scrapYear = yearStudy.filter(value => value.includes(currentYear.toString()))
    scrapYear.pop()
    const week = await prisma.week.findMany({
        where: {
            yearStudyId: {
                in: scrapYear
            },
        }
    });

    for (let yearItem of scrapYear) {
        for (let semester of term) {
            const weekData = week.filter(value => value.yearStudyId === yearItem && value.semesterId === semester)
            if (!weekData) continue
            let studentClass = await loadClassStudent(yearItem, semester);

            studentClass = handlerStudentClass(studentClass);

            for (let studentClassItem of studentClass) {
                //TODO: scrap more week


                const weekDatum = weekData[3]
                const result = await axios.get(
                    `https://portal.huflit.edu.vn/public/DrawingClassStudentSchedules_Mau2?YearStudy=${yearItem}&TermID=${semester}&Week=${weekDatum.weekValue}&ClassStudentID=${studentClassItem + "03"}`)
                const $ = load(result.data)

                const tr = $("tr:not(:first-child)")
                tr.each((_, element) => {
                    const divL = $(element).find("td div")
                    divL.each((_index, element) => {
                        try {
                            let result = getSubjectDataFromRaw($(element).text());
                            if (existSubjectId.includes(result.subjectId)) return;
                            existSubjectId.push(result.subjectId);
                            prisma.subject.findFirst({
                                where: {
                                    subjectCode: result.subjectId,
                                    yearStudyId: yearItem,
                                    semesterId: semester
                                }
                            }).then(value => {
                                if (!value) {
                                    prisma.subject.create({
                                        data: {
                                            subjectCode: result.subjectId,
                                            name: result.subjectName,
                                            semester: {
                                                connectOrCreate: {
                                                    where: {
                                                        semester: semester
                                                    },
                                                    create: {
                                                        semester: semester
                                                    }
                                                }
                                            },
                                            yearStudy: {
                                                connectOrCreate: {
                                                    where: {
                                                        year: yearItem
                                                    },
                                                    create: {
                                                        year: yearItem
                                                    }
                                                }
                                            },
                                            major: {
                                                connectOrCreate: {
                                                    where: {
                                                        name: "_"
                                                    },
                                                    create: {
                                                        name: "_"
                                                    }
                                                }
                                            }
                                        }
                                    }).then()
                                }

                            })
                        } catch (e) {
                            console.log($(element).text())
                            console.log(e)
                        }
                    })
                });
            }
        }
    }


}


async function loadClass(yearStudy: string[], term: string[]) {

    const lecture = await prisma.lecturer.findMany()
    for (let year of yearStudy) {
        for (let s of term) {
            const subject = await prisma.subject.findMany({
                where: {
                    yearStudyId: year,
                    semesterId: s
                }
            });
            const week = await prisma.week.findMany({
                where: {
                    yearStudyId: year,
                    semesterId: s
                }
            });

            const standardWeek = week[3]

            for (let subjectElement of subject) {
                const result = await axios.get(
                    `https://portal.huflit.edu.vn/public/DrawingCurriculumSchedules_MauTruong?YearStudy=${year}&TermID=${s}&CurriculumId=${subjectElement.subjectCode}&valueWeek=1&Week=${standardWeek.weekName}`)
                const classData = getClassDataFromRaw(result.data)
                for (let {id, lectureName, room, subjectId, time, type, weekDay} of classData) {

                    if (lecture.find(value => value.name.includes(lectureName)) === undefined) {
                        const newLecture = {
                            id: randomUUID(),
                            name: lectureName
                        }
                        await prisma.lecturer.create({
                            data: {
                                id: newLecture.id,
                                name: newLecture.name
                            }
                        })
                        lecture.push(newLecture)
                    }

                    const data = await prisma.class.findFirst({
                        where: {
                            id: id,
                            subjectId: subjectElement.id,
                            yearStudyId: year,
                            semesterId: s
                        }
                    });

                    if (data == null) {
                        // @ts-ignore
                        try {
                            //call from other thread
                            prisma.class.create({
                                data: {
                                    id: id,
                                    subject: {
                                        connect: {
                                            id: subjectElement.id
                                        }
                                    },
                                    room: room,
                                    time: time,
                                    weekDay: "T" + weekDay,
                                    type: type,
                                    yearStudy: {
                                        connect: {
                                            year: year
                                        }
                                    },
                                    semester: {
                                        connect: {
                                            semester: s
                                        }
                                    },
                                    lecturer: {
                                        connect: {
                                            id: lecture.find(value => value.name.includes(lectureName))!.id
                                        }
                                    }

                                }
                            }).then()

                        } catch (e) {
                            console.log(e)
                            console.log(id, lectureName, room, subjectId, time, type, weekDay)
                        }
                    }

                }
            }
        }
    }

}