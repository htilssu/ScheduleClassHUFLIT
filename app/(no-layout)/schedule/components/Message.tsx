import { Bot } from "lucide-react";
import { Card, ScrollArea, Table, Text } from "@mantine/core";
import { ClassData } from "@/lib/types";

interface MessageProps {
  text: string;
  sender: "bot" | "user";
  classes?: ClassData[];
}

export function Message({ text, sender, classes }: MessageProps) {
  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      {sender === "bot" && (
        <div className="shrink-0 mr-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
      <div
        className={`${
          sender === "user"
            ? "max-w-xs bg-blue-500 text-white rounded-3xl px-4 py-3"
            : "w-full max-w-3xl"
        }`}
      >
        {sender === "bot" ? (
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
      {sender === "user" && (
        <div className="shrink-0 ml-2">
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=40&width=40')",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
