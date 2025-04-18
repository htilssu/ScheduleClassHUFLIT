import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata cho trang API Documentation
 */
export const metadata: Metadata = {
  title: "API Documentation - Schedule HUFLIT",
  description: "Tài liệu API cho ứng dụng Schedule Class HUFLIT",
};

/**
 * Layout cho trang API Documentation
 * @param {object} props - Props của component
 * @param {React.ReactNode} props.children - Children elements
 * @returns {JSX.Element} - React component
 */
export default function ApiDocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={inter.className}>{children}</div>;
}
