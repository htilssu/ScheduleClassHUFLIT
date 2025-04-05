import { processChat } from "@/app/actions/chat";
import { ChatMessage, ChatRole } from "@/app/types/chat";
import { useUser } from "@/lib/hook/useUser";
import { Button, Flex, Stack, TextInput } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";

function ChatBox() {
  const { data: user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Chào bạn! Tôi là trợ lý lịch học HUFLIT.",
      role: ChatRole.ASSISTANT,
    },
    {
      content:
        "Bạn có thể hỏi tôi về lịch học, môn học, hoặc giáo viên. Tôi cũng có thể giúp bạn xếp lịch học tối ưu.",
      role: ChatRole.ASSISTANT,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Thêm tin nhắn của người dùng vào danh sách
    const newUserMessage: ChatMessage = {
      content: inputMessage,
      role: ChatRole.USER,
    };

    // Cập nhật danh sách tin nhắn với tin nhắn mới của người dùng
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    setInputMessage("");
    setIsTyping(true);
    setError(null);

    try {
      // Gọi server action để xử lý tin nhắn với lịch sử chat
      // limit 20 tin nhắn
      const limitedMessages = updatedMessages.slice(0, 20);
      const response = await processChat(inputMessage, limitedMessages);

      if (response.success && response.reply) {
        // Thêm tin nhắn phản hồi từ bot vào danh sách
        setMessages((prev) => [...prev, response.reply!]);
      } else {
        // Xử lý lỗi nếu có
        setError(response.error || "Có lỗi xảy ra khi xử lý tin nhắn");
        // Thêm tin nhắn lỗi từ bot
        const errorMessage: ChatMessage = {
          content:
            response.error ||
            "Có lỗi xảy ra khi xử lý tin nhắn, vui lòng thử lại sau.",
          role: ChatRole.ASSISTANT,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error: any) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      setError("Có lỗi xảy ra khi gửi tin nhắn");

      // Thêm tin nhắn lỗi từ bot
      const errorMessage: ChatMessage = {
        content: "Có lỗi xảy ra khi xử lý tin nhắn, vui lòng thử lại sau.",
        role: ChatRole.ASSISTANT,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <Flex
        className={"h-full"}
        gap={10}
        direction={"column"}
        justify={"space-between"}
      >
        <Stack className={"mt-3 overflow-y-auto"} flex={1}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <Message
                key={index}
                text={message.content}
                sender={message.role}
                userImage={user?.image || undefined}
                userName={user?.name || "Bạn"}
              />
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </Stack>
        <Flex gap={5}>
          <TextInput
            classNames={{
              input:
                "rounded-lg! border-gray-300 focus-within:border-gray-500 focus-within:ring-gray-500",
            }}
            size={"md"}
            flex={1}
            placeholder={"Nhập tin nhắn..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <Button
            size={"md"}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            loading={isTyping}
          >
            {isTyping ? "Đang xử lý..." : "Gửi"} &nbsp;
            <IconSend2 />
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default ChatBox;
