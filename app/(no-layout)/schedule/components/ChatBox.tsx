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

  // Thay vì sử dụng ref trực tiếp, chúng ta sẽ tạo tham chiếu đến phần tử DOM
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      content: inputMessage,
      role: ChatRole.USER,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    setInputMessage("");
    setIsTyping(true);
    setError(null);

    try {
      let limitedMessages = updatedMessages;

      if (
        updatedMessages.length === 3 &&
        updatedMessages[0].role === ChatRole.ASSISTANT &&
        updatedMessages[1].role === ChatRole.ASSISTANT &&
        updatedMessages[2].role === ChatRole.USER
      ) {
        limitedMessages = [updatedMessages[2]];
      } else {
        limitedMessages = updatedMessages.slice(-20);
      }

      const response = await processChat(inputMessage, limitedMessages);

      if (response.success && response.reply) {
        setMessages((prev) => [...prev, response.reply!]);
      } else {
        setError(response.error || "Có lỗi xảy ra khi xử lý tin nhắn");
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

      const errorMessage: ChatMessage = {
        content: "Có lỗi xảy ra khi xử lý tin nhắn, vui lòng thử lại sau.",
        role: ChatRole.ASSISTANT,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);

      // Sử dụng setTimeout để đảm bảo focus được áp dụng sau khi UI đã cập nhật
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
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
            ref={inputRef}
            autoFocus
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
