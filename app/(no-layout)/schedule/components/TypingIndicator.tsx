import { Bot } from "lucide-react";
import { Card, Loader } from "@mantine/core";

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex-shrink-0 mr-2">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
      </div>
      <Card shadow="sm" className="px-4 py-3 rounded-lg bg-white">
        <div className="flex items-center gap-2">
          <Loader size="xs" color="blue" />
          <span className="text-sm text-gray-500">Đang nhập...</span>
        </div>
      </Card>
    </div>
  );
}
