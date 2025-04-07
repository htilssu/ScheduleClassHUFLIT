import { processChat } from "@/lib/actions/chat";
import { ChatMessage, ChatRole } from "@/lib/types/chat";
import { useUser } from "@/lib/hook/useUser";
import {
  Button,
  Flex,
  Stack,
  TextInput,
  Switch,
  Group,
  Text,
} from "@mantine/core";
import {
  IconSend2,
  IconCalendar,
  IconMessageCircle,
} from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";
import { TimeLineState } from "@/lib/state/timeline";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/state";

function ChatBox() {
  const { data: user } = useUser();
  const { classes } = useSelector<RootState, TimeLineState>(
    (state) => state.timeline
  );
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
  const [isScheduleMode, setIsScheduleMode] = useState(false);
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
      const lastestMessages = messages.slice(-10);

      while (lastestMessages[0].role === ChatRole.ASSISTANT) {
        lastestMessages.shift();
      }

      const response = await processChat(
        inputMessage,
        classes,
        lastestMessages
      );

      if (response.success && response.reply) {
        setMessages((prev) => [
          ...prev,
          {
            content: response.reply as string,
            role: ChatRole.ASSISTANT,
          },
        ]);
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

  const handleToggleMode = () => {
    setIsScheduleMode(!isScheduleMode);
    // Thêm thông báo chuyển chế độ
    setMessages((prev) => [
      ...prev,
      {
        content: isScheduleMode
          ? "Đã chuyển sang chế độ hỏi đáp. Bạn có thể hỏi tôi bất kỳ câu hỏi nào liên quan đến HUFLIT."
          : "Đã chuyển sang chế độ xếp lịch học. Tôi sẽ giúp bạn xếp lịch học tối ưu. Vui lòng cung cấp thông tin về các môn học, thời gian và các ràng buộc (nếu có).",
        role: ChatRole.ASSISTANT,
      },
    ]);
  };

  return (
    <>
      <Flex
        className={"h-full"}
        gap={10}
        direction={"column"}
        justify={"space-between"}
      >
        <Group style={{ justifyContent: "flex-end" }} mb={5}>
          <Group style={{ gap: "xs" }}>
            <IconMessageCircle
              size={16}
              color={!isScheduleMode ? "blue" : "gray"}
            />
            <Switch
              checked={isScheduleMode}
              onChange={handleToggleMode}
              size="md"
              color="blue"
              thumbIcon={
                isScheduleMode ? (
                  <IconCalendar size={12} stroke={2.5} color="white" />
                ) : (
                  <IconMessageCircle size={12} stroke={2.5} color="white" />
                )
              }
            />
            <IconCalendar size={16} color={isScheduleMode ? "blue" : "gray"} />
            <Text size="sm" fw={500}>
              {isScheduleMode ? "Chế độ xếp lịch" : "Chế độ hỏi đáp"}
            </Text>
          </Group>
        </Group>

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
            ref={inputRef}
            classNames={{
              input:
                "rounded-lg! border-gray-300 focus-within:border-gray-500 focus-within:ring-gray-500",
            }}
            size={"md"}
            flex={1}
            placeholder={
              isScheduleMode
                ? "Mô tả yêu cầu xếp lịch học của bạn..."
                : "Nhập tin nhắn..."
            }
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
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
