import {prisma} from "@/lib/service/prismaClient";
import {PortalScraper} from "@/lib/PortalScraper";
import {DataExtractor} from "@/lib/DataExtractor";
import {DatabaseManager} from "@/lib/DatabaseManager";

export class DataImporter {
    private scraper: PortalScraper;
    private extractor: DataExtractor;
    private dbManager: DatabaseManager;

    constructor() {
        this.scraper = new PortalScraper();
        this.extractor = new DataExtractor();
        this.dbManager = new DatabaseManager();
    }

    async importData() {
        console.log("Đang lấy thông tin thời khóa biểu");
        const initialHtml = await this.scraper.getInitialPage();
        const terms = this.extractor.extractTerms(initialHtml);
        const yearStudies = this.extractor.extractYearStudies(initialHtml);
        await this.dbManager.saveTerms(terms);
        await this.dbManager.saveYearStudies(yearStudies);

        const currentYear = new Date().getFullYear().toString();
        const scrapYears = yearStudies.filter(year => year.includes(currentYear));

        for (const year of scrapYears) {
            for (const term of terms) {
                try {
                    const weeksData = await this.scraper.getWeeks(year, term);
                    const weeks = weeksData.map(week => ({
                        ...week,
                        yearValue: year,
                        semester: term
                    }));
                    await this.dbManager.saveWeeks(weeks);

                    const classStudents = await this.scraper.getClassStudentByTerm(year, term);
                    const studentClasses = this.extractor.handleStudentClass(classStudents);
                    const weekData = weeks[3]; // Sử dụng tuần thứ 4 như trong code gốc
                    for (const studentClass of studentClasses) {
                        const subjectHtml = await this.scraper.getSubjectData(year, term, weekData.Week,
                            studentClass + "03");
                        const subjects = this.extractor.extractSubjectsFromHtml(subjectHtml);
                        await this.dbManager.saveSubjects(subjects);
                    }
                } catch (e) {
                    console.error(`Lỗi khi xử lý năm ${year} và kỳ ${term}:`, e);
                }
            }
        }

        for (const year of scrapYears) {
            for (const term of terms) {
                const week = await prisma.week.findMany({
                    where: {
                        semesterId: term,
                        yearStudyId: year
                    }
                });

                const weekTarget = week[3]; // Tuần thứ 4
                const subjects = await prisma.subject.findMany();
                for (const subject of subjects) {
                    const classHtml = await this.scraper.getClassData(year, term, subject.id, 1, weekTarget.weekName);
                    const classes = this.extractor.extractClassesFromHtml(classHtml);
                    await this.dbManager.saveClasses(classes, year, term);
                }
            }
        }
    }
}