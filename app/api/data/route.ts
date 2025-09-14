import { NextResponse } from "next/server";
import { DataImporter } from "@/lib/data/DataImporter";

/**
 * @swagger
 * /v1/data:
 *   get:
 *     summary: Import dữ liệu hệ thống
 *     description: Import dữ liệu lớp học và lịch học vào hệ thống
 *     tags:
 *       - data
 *     responses:
 *       200:
 *         description: Nhập dữ liệu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Lỗi server
 */
export async function GET() {
  try {
    const importer = new DataImporter();
    await importer.importData();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error importing data:", error);
    return NextResponse.json(
      { success: false, error: "Error importing data" },
      { status: 500 }
    );
  }
}
