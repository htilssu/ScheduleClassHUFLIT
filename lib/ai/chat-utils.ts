/**
 * Module chứa các hàm tiện ích hỗ trợ cho chat
 */
import { ChatMessage, ChatRole } from "../../lib/types/chat";

/**
 * Lấy danh sách tin nhắn lịch sử và giới hạn số lượng tin nhắn
 * @param history - Danh sách tin nhắn lịch sử
 * @param maxMessages - Số tin nhắn tối đa cần giữ lại (mặc định là 5)
 * @returns Array - Danh sách tin nhắn đã giới hạn
 */
export function limitChatHistory(
  history: ChatMessage[],
  maxMessages: number = 5
): ChatMessage[] {
  // Nếu không có lịch sử, trả về mảng rỗng
  if (!history || history.length === 0) {
    return [];
  }

  // Cắt bớt lịch sử nếu quá dài, chỉ giữ lại 5 tin nhắn gần nhất
  let limitedHistory =
    history.length <= maxMessages
      ? [...history]
      : history.slice(history.length - maxMessages);

  // Nếu tin nhắn đầu tiên không phải của người dùng, tìm và cắt đến tin nhắn đầu tiên của người dùng
  if (limitedHistory.length > 0 && limitedHistory[0].role !== ChatRole.USER) {
    // Tìm vị trí tin nhắn đầu tiên của người dùng
    const firstUserIndex = limitedHistory.findIndex(
      (msg) => msg.role === ChatRole.USER
    );

    // Nếu tìm thấy tin nhắn người dùng, cắt đến tin nhắn đó
    if (firstUserIndex > 0) {
      limitedHistory = limitedHistory.slice(firstUserIndex);
    }
  }

  return limitedHistory;
}

/**
 * Chuyển đổi tin nhắn từ ứng dụng sang định dạng Google Generative AI
 * @param message - Tin nhắn từ ứng dụng
 * @returns Object - Tin nhắn định dạng Google Generative AI
 */
export function convertToGenerativeAIMessage(message: ChatMessage) {
  // Google Generative AI sử dụng 'user' và 'model', nhưng ứng dụng sử dụng ChatRole enum
  // Nếu là USER thì chuyển thành 'user', còn lại chuyển thành 'model'
  const aiRole = message.role === ChatRole.USER ? "user" : "model";

  return {
    role: aiRole,
    parts: [{ text: message.content }],
  };
}

/**
 * Lấy cấu hình generation mặc định
 * @returns Object - Cấu hình generation mặc định
 */
export function getDefaultGenerationConfig() {
  return {
    temperature: parseFloat(process.env.AI_TEMPERATURE || "0.7"),
    topK: parseInt(process.env.AI_TOP_K || "40"),
    topP: parseFloat(process.env.AI_TOP_P || "0.95"),
    maxOutputTokens: parseInt(process.env.AI_MAX_OUTPUT_TOKENS || "2048"),
    responseMimeType: "text/plain",
  };
}

/**
 * Kiểm tra nội dung tin nhắn người dùng có chứa các yêu cầu không liên quan hoặc cố gắng bypass không
 * @param message - Tin nhắn cần kiểm tra
 * @returns boolean - True nếu tin nhắn chứa nội dung cấm, False nếu không
 */
export function containsProhibitedContent(message: string): boolean {
  // Chuyển tin nhắn thành chữ thường để dễ so sánh
  const lowerMessage = message.toLowerCase().trim();

  // Danh sách các từ khóa/cụm từ cấm liên quan đến chủ đề
  const prohibitedTopicKeywords = [
    "viết văn",
    "viết thơ",
    "viết đoạn văn",
    "tả người yêu",
    "tả về",
    "kể chuyện",
    "tình yêu",
    "người yêu",
    "chính trị",
    "tôn giáo",
    "tin tức",
    "thời sự",
    "thể thao",
    "giải trí",
    "sức khỏe",
    "tài chính",
    "hack",
    "crack",
    "bẻ khóa",
    "virus",
    "nội dung người lớn",
    "sex",
    "khiêu dâm",
    "bạo lực",
    "vũ khí",
    "ma túy",
    "lời khuyên cá nhân",
    "tâm sự",
    "buôn chuyện",
    "nói xấu",
    // Thêm các từ khóa chung chung không liên quan
    "thời tiết",
    " nấu ăn",
    "du lịch",
    "phim ảnh",
    "âm nhạc",
    "xe cộ",
    "nhà cửa",
  ];

  // Danh sách các từ khóa/cụm từ cấm liên quan đến tác vụ
  const prohibitedActionKeywords = [
    "viết code",
    "viết phần mềm",
    "viết mã",
    "tạo mã",
    "lập trình",
    "dịch thuật",
    "làm giúp tôi",
    "làm hộ tôi",
    "làm dùm tôi",
    "làm bài tập",
    "giải bài tập",
    "vẽ",
    "thiết kế",
    "sáng tác",
    "tạo hình ảnh",
    "generate image",
  ];

  // Danh sách các mẫu câu cố gắng bypass hoặc thay đổi vai trò
  const bypassPatterns = [
    "hãy làm",
    "hãy đóng vai",
    "giả vờ",
    "giả sử",
    "giả định",
    "đóng giả",
    "quên đi",
    "bỏ qua",
    "ignore",
    "không phải là",
    "không còn là",
    "hãy bỏ qua các quy tắc",
    "ignore the rules",
    "forget your instructions",
    "bạn có thể làm", // Thường dùng để dò hỏi khả năng ngoài phạm vi
    "hãy sáng tạo",
    "be creative",
    "bỏ qua lời nhắc trước",
    "ignore previous prompt",
    "kể từ bây giờ",
    "from now on",
    "act as",
    "nói về bất cứ điều gì",
    "talk about anything",
    "bạn có ý kiến gì về", // Thường dẫn đến chủ đề cấm
    "theo bạn thì", // Dẫn đến ý kiến cá nhân
  ];

  // Kết hợp tất cả các danh sách cấm
  const allProhibited = [
    ...prohibitedTopicKeywords,
    ...prohibitedActionKeywords,
    ...bypassPatterns,
  ];

  // Kiểm tra xem tin nhắn có chứa bất kỳ từ khóa/mẫu câu cấm nào không
  for (const keyword of allProhibited) {
    // Sử dụng `includes` để kiểm tra sự tồn tại của chuỗi con
    // Có thể dùng regex nếu cần kiểm tra phức tạp hơn (ví dụ: `${keyword}` để khớp từ hoàn chỉnh)
    if (lowerMessage.includes(keyword)) {
      console.warn(
        `[Input Filter] Prohibited content detected: "${keyword}" in message: "${message}"`
      );
      return true; // Phát hiện nội dung cấm
    }
  }

  // Nếu không có từ khóa/mẫu câu cấm nào được tìm thấy
  return false;
}

/**
 * Kiểm tra phản hồi của model có phù hợp không, có bị lệch hướng không
 * @param response - Phản hồi cần kiểm tra
 * @param originalQuery - Câu hỏi gốc của người dùng (để đối chiếu nếu cần)
 * @returns boolean - True nếu phản hồi chứa nội dung cấm hoặc lệch hướng, False nếu không
 */
export function containsProhibitedResponse(
  response: string,
  originalQuery: string
): boolean {
  // Chuyển phản hồi thành chữ thường để dễ so sánh
  const lowerResponse = response.toLowerCase().trim();
  const lowerQuery = originalQuery.toLowerCase().trim();

  // Các mẫu câu trong phản hồi thường chỉ ra sự từ chối hoặc lệch hướng
  const refusalOrDeviationPatterns = [
    "xin lỗi, tôi không thể",
    "tôi không thể giúp",
    "tôi không thể viết",
    "tôi không thể tạo",
    "tôi không được phép",
    "nằm ngoài phạm vi",
    "không liên quan đến nhiệm vụ",
    "không thuộc phạm vi",
    "tôi chỉ là một trợ lý",
    "tôi là một mô hình ngôn ngữ",
    "tôi không có ý kiến cá nhân",
    "tôi không thể đưa ra lời khuyên",
    "như một mô hình ngôn ngữ lớn",
    "as a large language model",
    // Các câu trả lời chung chung, không trực tiếp vào câu hỏi về HUFLIT
    "tôi có thể giúp gì khác?",
    "is there anything else",
  ];

  // Kiểm tra các mẫu từ chối/lệch hướng
  for (const pattern of refusalOrDeviationPatterns) {
    if (lowerResponse.includes(pattern)) {
      console.warn(
        `[Output Filter] Potential deviation detected (Pattern: "${pattern}") in response: "${response}"`
      );
      // Nếu model tự nhận là không thể làm, hoặc lệch hướng, ta coi đó là phản hồi không phù hợp
      return true;
    }
  }

  // === Kiểm tra nâng cao hơn (Tùy chọn) ===
  // Kiểm tra xem chủ đề phản hồi có khớp với chủ đề câu hỏi không?
  // Ví dụ: Nếu hỏi về "lịch thi", mà trả lời về "thủ tục nhập học" -> Có thể lệch hướng.
  // Việc này phức tạp hơn, cần NLP sâu hơn. Tạm thời bỏ qua để tránh phức tạp.

  // Kiểm tra xem phản hồi có chứa từ khóa thuộc chủ đề cấm mà đáng lẽ không nên có không
  // (Dùng lại danh sách từ input filter)
  const prohibitedTopicKeywords = [
    "viết văn",
    "viết thơ",
    "tả người yêu",
    "chính trị",
    "tôn giáo",
    "hack",
    "viết code",
    // Chỉ cần kiểm tra một vài từ khóa tiêu biểu nhất của các chủ đề cấm
  ];
  for (const keyword of prohibitedTopicKeywords) {
    if (lowerResponse.includes(keyword) && !lowerQuery.includes(keyword)) {
      // Nếu phản hồi chứa từ khóa cấm mà câu hỏi gốc không chứa -> Rất có thể đã bị bypass
      console.warn(
        `[Output Filter] Prohibited topic keyword "${keyword}" detected in response, but not in query.`
      );
      return true;
    }
  }

  // Nếu không phát hiện vấn đề gì
  return false;
}
