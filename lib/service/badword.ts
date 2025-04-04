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

  static async checkBadWords(content: string) {
    const badWords = await this.getBadWords();
    const lowerContent = content.toLowerCase();
    const foundBadWords = badWords.filter((bw) =>
      lowerContent.includes(bw.word.toLowerCase())
    );

    return {
      hasBadWords: foundBadWords.length > 0,
      badWords: foundBadWords.map((bw) => bw.word),
    };
  }
}
