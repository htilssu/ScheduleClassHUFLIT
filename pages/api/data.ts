// noinspection TypeScriptValidateJSTypes

import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {load} from "cheerio";
import {prisma} from "@/services/prismaClient";
import {Lecturer} from "@prisma/client";


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
    const classStudent = await loadClassStudent(rawData.data)
    const term = await loadTerm(rawData.data)
    const year = await loadYearStudy(rawData.data)
    const week = await loadWeek(year, term)


    try {
        await prisma.yearStudy.createMany({
            data: year.map(value => {
                return {
                    year: value
                }
            }),
        })
    } catch
        (e) {
        console.log(e)
    }
    try {
        await prisma.semester.createMany({
            data: term.map(value => {
                return {
                    semester: value
                }
            }),
        })
    } catch
        (e) {
    }

    try {
        await prisma.lecturer.createMany({
            data: await loadProfessor(rawData.data),

        })
    } catch (e) {

    }

// console.log(year)
// console.log(classStudent)
// console.log(term)
// console.log(year)


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
                        week: string,
                        year: string,
                        semester: string
                    }[]
                }
                data.push(...result.data.map(value => {
                    return {
                        ...value,
                        year: year,
                        semester: term1,
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

/*async function loadSubject(yearStudy: string[], term: string[]) {
    const data = []

    for (const year of yearStudy) {
        for (const term1 of term) {
            try {
                const result = await axios.get(`https://portal.huflit.edu.vn/Public/GetClassStudentByTerm/${year}$${term1}`)

            } catch (e) {
            }
        }

    }

    return data
}*/

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