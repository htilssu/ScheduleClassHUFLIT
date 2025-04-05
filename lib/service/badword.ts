import { prisma } from "../prisma";
import { unstable_cache } from "next/cache";

export class BadWordService {
  static getBadWords = unstable_cache(
    async () => {
      return await prisma.badWord.findMany();
    },
    ["bad-words"],
    { revalidate: 900, tags: ["bad-words"] }
  );

  /**
   * Kiểm tra nội dung có chứa từ cấm hay không
   * @param content - Nội dung cần kiểm tra
   * @returns Object chứa kết quả kiểm tra và danh sách từ cấm tìm thấy
   */
  static async checkBadWords(content: string) {
    // Lấy danh sách từ cấm từ cache hoặc database
    const badWords = await this.getBadWords();

    // Chuyển đổi nội dung cần kiểm tra thành chữ thường
    const lowerContent = content.toLowerCase();

    // Tìm các từ cấm trong nội dung
    // Lưu ý: Từ cấm trong database đã được lưu ở dạng chữ thường
    const foundBadWords = badWords.filter((bw) =>
      lowerContent.includes(bw.word)
    );

    return {
      hasBadWords: foundBadWords.length > 0,
      badWords: foundBadWords.map((bw) => bw.word),
    };
  }
}
