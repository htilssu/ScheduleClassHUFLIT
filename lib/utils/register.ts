import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Tên phải có ít nhất 2 ký tự" })
    .max(32, { message: "Tên không được dài quá 32 ký tự" })
    .regex(/^[\p{L}\s'.-]+$/u, {
      message:
        "Tên chỉ được chứa chữ cái, khoảng trắng, dấu nháy hoặc dấu gạch ngang",
    }),
  email: z.string().email("Địa chỉ email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

export type RegisterData = z.infer<typeof registerSchema>;

export { registerSchema };
