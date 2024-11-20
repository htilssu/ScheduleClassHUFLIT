import {getSubjectDataFromRaw} from "@/util/data";

test("test subject with ()", () => {
   const dada= getSubjectDataFromRaw("-Môn: Văn hóa doanh nghiệp (tiếng Trung) (1930082)-Lớp: TTM2001-Tiết: 5->6-Phòng: K72-GV: Lưu Cẩm Huệ-Nội dung:")
   expect(dada.subjectId).toBe("1930082")
    expect(dada.subjectName).toBe("Văn hóa doanh nghiệp (tiếng Trung)")
    expect(dada.lectureName).toBe("Lưu Cẩm Huệ")
    expect(dada.room).toBe("K72")
    expect(dada.time).toBe("5-6")

});

test("test subject with - and ()", () => {
   const dada= getSubjectDataFromRaw("-Môn: Văn hóa doanh - nghiệp (tiếng Trung) (1930082)-Lớp: TTM2001-Tiết: 5->6-Phòng: K72-GV: Lưu Cẩm Huệ-Nội dung:")
   expect(dada.subjectId).toBe("1930082")
   expect(dada.subjectName).toBe("Văn hóa doanh - nghiệp (tiếng Trung)")
   expect(dada.lectureName).toBe("Lưu Cẩm Huệ")
   expect(dada.room).toBe("K72")
   expect(dada.time).toBe("5-6")

});