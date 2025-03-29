import { Bot } from "lucide-react"

interface MessageProps {
    text: string
    sender: "bot" | "user"
}

export function Message({ text, sender }: MessageProps) {
    return (
        <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
            {sender === "bot" && (
                <div className="flex-shrink-0 mr-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                </div>
            )}
            <div
                className={`max-w-xs px-4 py-3 rounded-3xl ${
                    sender === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300"
                }`}
            >
                {text}
            </div>
            {sender === "user" && (
                <div className="flex-shrink-0 ml-2">
                    <div
                        className="w-10 h-10 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: "url('/placeholder.svg?height=40&width=40')" }}
                    ></div>
                </div>
            )}
        </div>
    )
}

