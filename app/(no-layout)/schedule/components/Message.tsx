import { Avatar, Text } from "@mantine/core";
import { Bot } from "lucide-react";
import { ChatRole } from "@/lib/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Tùy chỉnh các thành phần markdown
                  h1: ({ node, ...props }) => (
                    <h1 className="text-xl font-bold my-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-lg font-bold my-2" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-md font-bold my-1" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="my-1" {...props} />,
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 my-1" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 my-1" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="my-0.5" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <table
                      className="border-collapse border border-gray-300 my-2 w-full"
                      {...props}
                    />
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-gray-100" {...props} />
                  ),
                  tbody: ({ node, ...props }) => <tbody {...props} />,
                  tr: ({ node, ...props }) => (
                    <tr className="border-b border-gray-300" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="border border-gray-300 px-2 py-1 text-left"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="border border-gray-300 px-2 py-1"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      className="block bg-gray-100 p-2 rounded my-2 whitespace-pre-wrap overflow-x-auto"
                      {...props}
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-gray-300 pl-4 italic my-2"
                      {...props}
                    />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="my-3 border-gray-300" {...props} />
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
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
