import { NextResponse } from "next/server";
import { getSwaggerSpec } from "@/swagger.config";

/**
 * API endpoint trả về cấu hình Swagger
 * @returns {NextResponse} - JSON response chứa thông tin Swagger
 */
export async function GET() {
  const spec = getSwaggerSpec();
  return NextResponse.json(spec);
}
