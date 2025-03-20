import {prisma} from "@/lib/service/prismaClient";
import {error, info} from "@/lib/utils/logging";
import {WeekResponse} from "./types";

export class DatabaseManager {
    // Lưu danh sách kỳ học
    async saveTerms(terms: string[]) {
        for (const term of terms) {
            const existingTerm = await prisma.semester.findUnique({where: {semester: term}});
            if (!existingTerm) {
                await prisma.semester.create({data: {semester: term}});
            }
        }
    }

    // Lưu danh sách năm học
    async saveYearStudies(years: string[]) {
        for (const year of years) {

            try {
                await prisma.yearStudy.create({data: {year}});
                info('Lưu năm học thành công: ' + year);
            } catch (e) {
                error('Năm học đã tồn tại: ' + year);
            }
        }
    }

    // Lưu danh sách tuần học
    async saveWeeks(weeks: (WeekResponse & { semester: string, yearValue: string })[]) {
        for (const week of weeks) {
            try {
                await prisma.week.create({
                    data: {
                        weekValue: week.Week,
                        weekName: week.DisPlayWeek,
                        Semester: {
                            connectOrCreate: {
                                where: {semester: week.semester},
                                create: {semester: week.semester}
                            }
                        },
                        YearStudy: {
                            connectOrCreate: {
                                where: {year: week.yearValue},
                                create: {year: week.yearValue}
                            }
                        }
                    }
                })

                info('Lưu tuần học thành công: ' + week.Week);
            } catch (e) {
                error('Lỗi khi lưu tuần học: ' + week.Week);
            }
        }
    }

    // Lưu danh sách môn học
    async saveSubjects(subjects: any[]) {
        for (const subject of subjects) {
            try {
                await prisma.subject.create({
                    data: {
                        id: subject.id,
                        name: subject.name,
                        Major: {
                            connectOrCreate: {
                                where: {name: "_"},
                                create: {name: "_"}
                            }
                        }
                    }
                });

                info('Lưu môn học thành công: ' + subject.name);
            } catch (e) {
                error('Môn học đã tồn tại: ' + subject.name);
            }
        }
    }

    // Lưu danh sách lớp học
    async saveClasses(classes: any[], year: string, term: string) {
        for (const classData of classes) {
            const {id, lectureName, room, subjectId, time, type, weekDay} = classData;
            let lecturer = await prisma.lecturer.findFirst({where: {name: lectureName}});
            if (!lecturer) {
                lecturer = await prisma.lecturer.create({data: {name: lectureName}});
            }
            const existingClass = await prisma.class.findFirst({
                where: {
                    classId: id,
                    time: time,
                    weekDay: "T" + weekDay,
                    yearStudyId: year,
                    semesterId: term,
                    Subject: {id: subjectId}
                },
                include: {Lecturer: true}
            });
            if (!existingClass) {
                await prisma.class.create({
                    data: {
                        classId: id,
                        Subject: {connect: {id: subjectId}},
                        room: room,
                        time: time,
                        weekDay: "T" + weekDay,
                        type: type,
                        YearStudy: {connect: {year}},
                        Semester: {connect: {semester: term}},
                        Lecturer: {connect: {id: lecturer.id}}
                    }
                });
            } else if (existingClass.Lecturer.name !== lectureName) {
                await prisma.class.update({
                    where: {id: existingClass.id},
                    data: {Lecturer: {connect: {id: lecturer.id}}}
                });
            }
        }
    }
}