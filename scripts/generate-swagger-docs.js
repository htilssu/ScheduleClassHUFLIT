/**
 * Script để tạo tài liệu Swagger từ JSDoc comments
 */
const fs = require("fs");
const path = require("path");
const { createSwaggerSpec } = require("next-swagger-doc");

// Đường dẫn để lưu tài liệu Swagger
const outputPath = path.join(process.cwd(), "public", "swagger.json");

// Tạo thông số Swagger
const spec = createSwaggerSpec({
  apiFolder: "app", // Thư mục chứa các API routes
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Schedule HUFLIT API Documentation",
      version: "1.0.0",
      description: "API tài liệu cho ứng dụng Schedule Class HUFLIT",
      contact: {
        name: "Admin",
        email: "admin@example.com",
      },
    },
    servers: [
      {
        url: "/api",
        description: "API Server",
      },
      {
        url: "/v1",
        description: "API V1 Server",
      },
    ],
    tags: [
      {
        name: "classes",
        description: "API quản lý lớp học",
      },
      {
        name: "schedule",
        description: "API quản lý lịch học",
      },
      {
        name: "auth",
        description: "API xác thực người dùng",
      },
      {
        name: "data",
        description: "API quản lý dữ liệu",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
});

// Đảm bảo thư mục public tồn tại
if (!fs.existsSync(path.join(process.cwd(), "public"))) {
  fs.mkdirSync(path.join(process.cwd(), "public"));
}

// Ghi thông số Swagger vào file
fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2), "utf8");

console.log(`Swagger documentation generated at ${outputPath}`);
