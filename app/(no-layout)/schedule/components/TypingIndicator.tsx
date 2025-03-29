import { Bot } from "lucide-react"

export function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="flex-shrink-0 mr-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                </div>
            </div>
            <div className="bg-white px-4 py-3 rounded-3xl border border-gray-300">
                <div className="flex space-x-1 items-center h-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce-delay-1"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce-delay-2"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce-delay-3"></div>
                </div>
            </div>
        </div>
    )
}
