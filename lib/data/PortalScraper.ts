import axios from "axios";
import {WeekResponse} from "@/lib/types";
import { debug } from "../utils/logging";

export class PortalScraper {
    private readonly httpsAgent: any;

    constructor() {
        this.httpsAgent = new (require("https").Agent)({rejectUnauthorized: false});
    }

    // Lấy trang ban đầu chứa thông tin terms và year studies
    async getInitialPage(): Promise<string> {
        const response = await axios.get("https://portal.huflit.edu.vn/public/tracuuthoikhoabieu", {
            httpsAgent: this.httpsAgent
        });
        return response.data;
    }

    // Lấy danh sách tuần học dựa trên năm học và kỳ
    async getWeeks(yearStudy: string, term: string): Promise<WeekResponse[]> {
        const response = await axios.get(`https://portal.huflit.edu.vn/Public/GetWeek/${yearStudy}$${term}`, {
            httpsAgent: this.httpsAgent
        });
        return response.data;
    }

    // Lấy danh sách lớp sinh viên theo năm học và kỳ
    async getClassStudentByTerm(yearStudy: string, term: string): Promise<any[]> {
        const response = await axios.get(
            `https://portal.huflit.edu.vn/Public/GetClassStudentByTerm/${yearStudy}$${term}`, {
                httpsAgent: this.httpsAgent
            });
        return response.data;
    }

    // Lấy dữ liệu môn học dựa trên năm, kỳ, tuần và mã lớp sinh viên
    async getSubjectData(yearStudy: string, term: string, week: number, classStudentId: string): Promise<string> {
        const url = `https://portal.huflit.edu.vn/public/DrawingClassStudentSchedules_Mau2?YearStudy=${yearStudy}&TermID=${term}&Week=${week}&ClassStudentID=${classStudentId}`;
        const response = await axios.get(url, {httpsAgent: this.httpsAgent});
        return response.data;
    }

    // Lấy dữ liệu lớp học dựa trên năm, kỳ, mã môn học, tuần
    async getClassData(yearStudy: string, term: string, curriculumId: string, valueWeek: number,
                       week: number): Promise<string> {
        const url = `https://portal.huflit.edu.vn/public/DrawingCurriculumSchedules_MauTruong?YearStudy=${yearStudy}&TermID=${term}&CurriculumId=${curriculumId}&valueWeek=${valueWeek}&Week=${week}`;
        const response = await axios.get(url, {httpsAgent: this.httpsAgent});
        return response.data;
    }
}