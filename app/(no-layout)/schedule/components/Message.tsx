import { Avatar, Text } from "@mantine/core";
import { Bot } from "lucide-react";
import { ChatRole } from "@/app/types/chat";
interface MessageProps {
  text: string;
  sender: ChatRole;
  userImage?: string;
  userName?: string;
}

export function Message({
  text,
  sender,
  userImage,
  userName = "Bạn",
}: MessageProps) {
  // Lấy chữ cái đầu tiên của tên người dùng làm chữ cái hiển thị trong avatar
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      {sender === ChatRole.ASSISTANT && (
        <div className="shrink-0 mr-2">
          <Avatar size="md" radius="xl" color="blue" variant="filled">
            <Bot className="w-6 h-6 text-white" />
          </Avatar>
        </div>
      )}
      <div
        className={`${
          sender === "user"
            ? "max-w-xs bg-blue-500 text-white rounded-3xl px-4 py-3"
            : "w-full max-w-3xl"
        }`}
      >
        {sender === ChatRole.ASSISTANT ? (
          <div
            className={`max-w-3xl w-fit bg-white text-black border border-gray-300 rounded-3xl px-4 py-3`}
          >
            <Text size="md" style={{ whiteSpace: "pre-line" }}>
              {text}
            </Text>
          </div>
        ) : (
          text
        )}
      </div>
      {sender === ChatRole.USER && (
        <div className="shrink-0 ml-2">
          {userImage ? (
            <Avatar size="md" radius="xl" src={userImage} alt={userName} />
          ) : (
            <Avatar size="md" radius="xl" color="blue" variant="filled">
              {userInitial}
            </Avatar>
          )}
        </div>
      )}
    </div>
  );
}
