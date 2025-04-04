import { ClassData } from "@/lib/types";
import { Button, Flex, Stack, TextInput } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";

type ChatMessage = {
  id: string;
  text: string;
  sender: "bot" | "user";
  classes?: ClassData[];
};

function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Chào bạn! Tôi là trợ lý lịch học HUFLIT.",
      sender: "bot",
    },
    {
      id: "2",
      text: "Bạn có thể hỏi tôi về lịch học, môn học, hoặc giáo viên.",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Thêm tin nhắn của người dùng vào danh sách
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Giả lập xử lý tin nhắn
    setTimeout(() => {
      // Thêm câu trả lời của bot
      const botResponse: ChatMessage = {
        id: Date.now().toString(),
        text: "Tôi đã nhận được tin nhắn của bạn. Chức năng trò chuyện đang được phát triển.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
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
            {messages.map((message) => (
              <Message
                key={message.id}
                text={message.text}
                sender={message.sender}
                classes={message.classes}
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
          />
          <Button
            size={"md"}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
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
