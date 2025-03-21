import {prisma} from "@/lib/service/prismaClient";
import {error, info} from "@/lib/utils/logging";
import {WeekResponse} from "./types";
import {ClassExtractData} from "@/lib/utils/data";

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
    async saveClasses(classes: ClassExtractData[], year: string, term: string) {
        for (const classItem of classes) {
            let lecturer = await prisma.lecturer.findFirst({where: {name: classItem.lectureName}});

            if (!lecturer) {
                lecturer = await prisma.lecturer.create({data: {name: classItem.lectureName}});
            }

            const weekDays = classItem.learningSection.map(section => section.weekDay);

            const existingClass = await prisma.class.findFirst({
                where: {
                    classId: classItem.classId,
                    learningSection: {
                        some: {
                            weekDay: {in: weekDays},
                        },
                    },
                    semesterId: term,
                    yearStudyId: year,
                },
                include: {Lecturer: true},
            });

            if (!existingClass) {
                try {
                    const {subjectId, classId, type, learningSection} = classItem;
                    await prisma.class.create({
                        data: {
                            classId,
                            type,
                            learningSection,
                            Subject: {connect: {id: subjectId}},
                            YearStudy: {connect: {year}},
                            Semester: {connect: {semester: term}},
                            Lecturer: {connect: {id: lecturer.id}}
                        }
                    });
                    info("Lưu lớp học thành công: " + classId);
                } catch (e) {
                    error("Lỗi khi lưu lớp học: " + classItem.classId);
                    error(e);
                }
            } else if (existingClass.Lecturer.name !== classItem.lectureName) {
                try {
                    await prisma.class.update({
                        where: {id: existingClass.id},
                        data: {Lecturer: {connect: {id: lecturer.id}}}
                    });
                    info(
                        "Cập nhật giảng viên thành công cho lớp học: " + classItem.classId + ` | ${existingClass.Lecturer.name}-->${classItem.lectureName}`);
                } catch (e) {
                    error("Lỗi khi cập nhật giảng viên cho lớp học: " + classItem.classId);
                    error(e);
                }
            }
        }
    }
}