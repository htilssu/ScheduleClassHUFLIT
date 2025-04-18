import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";

/**
 * @swagger
 * /v1/class/{class_id}:
 *   get:
 *     summary: Lấy thông tin lớp học theo ID
 *     description: Trả về thông tin chi tiết của một lớp học dựa trên ID
 *     tags:
 *       - classes
 *     parameters:
 *       - name: class_id
 *         in: path
 *         required: true
 *         description: ID của lớp học
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin lớp học
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "Lập trình Web"
 *       404:
 *         description: Không tìm thấy lớp học
 *       500:
 *         description: Lỗi server
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { class_id: string } }
) {
  try {
    // Mã để lấy thông tin lớp học
    // Hiện đang trả về 404 Not Found
    return notFound();
  } catch (error) {
    console.error("Error fetching class:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
