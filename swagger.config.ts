import { createSwaggerSpec } from "next-swagger-doc";

/**
 * Cấu hình Swagger cho API của ứng dụng
 */
export const getSwaggerSpec = () => {
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

  return spec;
};
