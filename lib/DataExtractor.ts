import {load} from "cheerio";
import {getSubjectDataFromRaw, getClassDataFromRaw, ClassExtractData} from "@/lib/utils/data";

export class DataExtractor {
    // Trích xuất danh sách kỳ học từ HTML
    extractTerms(html: string): string[] {
        const $ = load(html);
        const terms: string[] = [];
        $("#TermID option").each((_, element) => {
            terms.push($(element).attr("value")!);
        });
        return terms;
    }

    // Trích xuất danh sách năm học từ HTML
    extractYearStudies(html: string): string[] {
        const $ = load(html);
        const years: string[] = [];
        $("#YearStudy option").each((_, element) => {
            years.push($(element).attr("value")!);
        });
        return years;
    }

    // Trích xuất danh sách môn học từ HTML
    extractSubjectsFromHtml(html: string): any[] {
        const $ = load(html);
        const subjects: any[] = [];
        const tr = $("tr:not(:first-child)");
        tr.each((_, element) => {
            const divL = $(element).find("td div");
            divL.each((_index, element) => {
                try {
                    const subjectData = getSubjectDataFromRaw($(element).html() ?? "");
                    subjects.push(subjectData);
                } catch (e) {
                    console.log($(element).text());
                    console.log(e);
                }
            });
        });
        return subjects;
    }

    // Trích xuất danh sách lớp học từ HTML
    extractClassesFromHtml(html: string): ClassExtractData[] {
        return getClassDataFromRaw(html);
    }

    // Xử lý danh sách lớp sinh viên để lấy mã lớp 4 ký tự
    handleStudentClass(studentClass: { ClassStudentID: string }[]): string[] {
        const data: string[] = [];
        studentClass.forEach(value => {
            const fourChar = value.ClassStudentID.slice(0, 4);
            if (!data.includes(fourChar)) {
                data.push(fourChar);
            }
        });
        return data;
    }
}