import { NextRequest, NextResponse } from "next/server";
import { DataImporter } from "@/lib/data/DataImporter";

/**
 * @swagger
 * /v1/data/class:
 *   get:
 *     summary: Import dữ liệu lớp học
 *     description: Import dữ liệu lớp học từ nguồn ngoài vào hệ thống theo năm học và học kỳ
 *     tags:
 *       - classes
 *       - data
 *     parameters:
 *       - name: year
 *         in: query
 *         required: true
 *         description: Năm học cần import dữ liệu
 *         schema:
 *           type: string
 *           example: "2023-2024"
 *       - name: semester
 *         in: query
 *         required: true
 *         description: Học kỳ cần import dữ liệu
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Import dữ liệu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Thiếu tham số đầu vào
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing year or semester"
 *       500:
 *         description: Lỗi server
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const year = searchParams.get("year");
    const semester = searchParams.get("semester");

    if (!year || !semester) {
      return NextResponse.json(
        { error: "Missing year or semester" },
        { status: 400 }
      );
    }

    const importer = new DataImporter();
    await importer.importClasses(year, semester);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error importing class data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
