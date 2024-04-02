// noinspection TypeScriptValidateJSTypes

import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {load} from "cheerio";
import {prisma} from "@/services/prismaClient";
import {Lecturer} from "@prisma/client";

const weekDayMap = new Map<string,string>();
weekDayMap.set("Thứ 2","T2")
weekDayMap.set("Thứ 3","T3")
weekDayMap.set("Thứ 4","T4")
weekDayMap.set("Thứ 5","T5")
weekDayMap.set("Thứ 6","T6")
weekDayMap.set("Thứ 7","T7")
weekDayMap.set("Chủ nhật","CN")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case "POST":
            await scrapData()
            res.status(200).json({message: "Scraping data"})
            break;
    }
}

async function scrapData() {
    const rawData = await axios.get("https://portal.huflit.edu.vn/public/tracuuthoikhoabieu")
    const classStudent: { ClassStudentID: string, ClassStudentName: string } = await loadClassStudent(rawData.data)
    const term = await loadTerm(rawData.data)
    const year = await loadYearStudy(rawData.data)
    const week = await loadWeek(year, term)
    const subject = await loadSubject(classStudent, year, term, week)


// console.log(year)
// console.log(classStudent)
// console.log(term)
// console.log(year)

    async function saveData() {
        //save year
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

        //save semester
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
        //save week
        for (const value of week) {
            const data = await prisma.week.findFirst({
                where: {
                    yearStudyId: value.year,
                    semesterId: value.semester,
                    week: value.week
                }

            })


            if (!data) {
                await prisma.week.create({
                    data: {
                        week: value.week,
                        semesterId: value.semester,
                        yearStudyId: value.year
                    }
                })

            }
        }
    }

}

async function loadClassStudent(rawData: string) {
    const result = await axios.get("https://portal.huflit.edu.vn/Public/GetClassStudentByTerm/2023-2024$HK03")
    return result.data
}

async function loadTerm(rawData: string) {
    const $ = load(rawData)
    const term: string[] = []
    $("#TermID option").each((index, element) => {
        term.push($(element).attr("value")!)
    })

    return term
}

async function loadWeek(yearStudy: string[], term: string[]) {
    const data = []

    for (const year of yearStudy) {
        for (const term1 of term) {
            try {
                const result = await axios.get(`https://portal.huflit.edu.vn/Public/GetWeek/${year}$${term1}`) as {
                    data: {
                        Week: number,
                        year: string,
                        semester: string
                    }[]
                }
                data.push(...result.data.map(value => {
                    return {
                        ...value,
                        year: year,
                        semester: term1,
                        week: value.Week,
                    }
                }))
            } catch (e) {
            }
        }

    }

    return data
}

async function loadYearStudy(rawDataL: string) {
    const $ = load(rawDataL)
    const year: string[] = []
    $("#YearStudy2 option").each((index, element) => {
        year.push($(element).attr("value")!)
    })

    return year


}

async function loadSubject(studentClass: any, yearStudy: string[], term: string[], week: {
    Week: number,
    year: string,
    semester: string
}[]) {


    const currentYear = new Date().getFullYear();
    const scrapYear = yearStudy.filter(value => value.includes(currentYear.toString()))

    for (let yearItem of scrapYear) {
        for (let semester of term) {
            const weekData = week.filter(value => value.year === yearItem && value.semester === semester)
            if (!weekData) continue
            for (let studentClassItem of studentClass) {
                for (let weekDatum of weekData) {
                    console.log(weekDatum)
                    const result = await axios.get(`https://portal.huflit.edu.vn/public/DrawingClassStudentSchedules_Mau2?YearStudy=${yearItem}&TermID=${semester}&Week=${weekDatum.Week}&ClassStudentID=${studentClassItem.ClassStudentID}`)
                    const $ = load(result.data)
                    const tr = $("tr:not(:first-child)")
                    tr.each((index, element) => {
                        const th = $(element).find("th")
                        const weekDay = $(th).text().split("(")[0].trim()
                        const shortWeekDay = weekDayMap.get(weekDay)
                        const divL = $(element).find("td div")

                        if (divL.length != 0){
                            console.log(divL.length)
                        }
                    });


                }
            }
        }
    }

}

async function loadProfessor(rawData: string) {
    const $ = load(rawData)
    const professor: Lecturer[] = []
    $("#ProfessorID option").each((index, element) => {
        professor.push({
            id: $(element).attr("value")!,
            name: $(element).text()
        })
    })


    return professor

}