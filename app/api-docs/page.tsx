"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

/**
 * Trang hiển thị tài liệu API bằng Swagger UI
 * @returns {JSX.Element} - React component
 */
export default function ApiDocs() {
  const [spec, setSpec] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // Tải tài liệu Swagger từ endpoint
    fetch("/api/swagger")
      .then((response) => response.json())
      .then((data) => setSpec(data))
      .catch((error) => console.error("Error loading swagger spec:", error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">API Documentation</h1>
        {spec ? (
          <SwaggerUI spec={spec} />
        ) : (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
