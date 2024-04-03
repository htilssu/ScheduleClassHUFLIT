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

export function getSubjectDataFromRaw(rawData: string): ClassData {
    //-Môn: Tiếng Anh chuyên ngành Kế toán - Kiểm toán 1 (2010263)-Lớp: TK2205-Tiết: 13->15-Phòng: K62-GV: Nguyễn Thái Đức-Nội dung:
    let data = {}
    const a = rawData.split(")-Lớp:")
    const b = a[0].split("(") //b[1]: 2010263
    const subjectName = b[0].split(":")[1].trim() //Tiếng Anh chuyên ngành Kế toán - Kiểm toán 1
    if (b.length > 2) {
        data = {...data, subjectName: subjectName + " (" + b[1].trim()}
    } else {
        data = {...data, subjectName: subjectName}
    }
    data = {...data, subjectId: b[b.length - 1]}
    const c = a[1].split("-Tiết:")
    const d = c[1].split("-Phòng:")
    data = {...data, time: d[0].trim().replace("->", "-")}
    const e = d[1].split("-GV:")
    data = {...data, room: e[0].trim()}
    const f = e[1].split("-Nội dung:")
    data = {...data, lectureName: f[0].trim()}

    return data as ClassData;
}

export function getClassDataFromRaw(rawData: string): ClassData[] {
    const $ = load(rawData);
    let result: {}[] = [];

    const tr = $("tbody tr");
    tr.each((_, element) => {
        let temp = {}
        const td = $(element).find("td");
        if (td.length < 10) return;
        td.each((index, element) => {
            switch (index) {
                case 1:
                    temp = {...temp, subjectId: $(element).text().trim()}
                    break;
                case 2:
                    temp = {...temp, id: $(element).text().trim()}
                    break;
                case 5:
                    temp = {...temp, type: $(element).text().trim()}
                    break;
                case 7:
                    temp = {...temp, time: $(element).text().trim()}
                    break;
                case 8:
                    temp = {...temp, weekDay: $(element).text().trim()}
                    break;
                case 10:
                    temp = {...temp, room: $(element).text().trim()}
                    break;
                case 11:
                    temp = {
                        ...temp, lectureName: $(element).text().trim()
                            .replace("  ", " ")
                    }
            }
        });

        result.push(temp);
    });


    return result as ClassData[];

}

