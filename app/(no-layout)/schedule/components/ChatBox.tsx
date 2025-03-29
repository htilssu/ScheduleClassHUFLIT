import React, {useEffect, useRef, useState } from 'react';
import {Button, Flex, Stack, TextInput} from "@mantine/core";
import {IconSend2} from "@tabler/icons-react";
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';

function ChatBox() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi Jane!", sender: "bot" },
        { id: 2, text: "How can I assist you?How can I assist you?How can I assist you?How can I assist you?", sender: "bot" },
        { id: 3, text: "Do I have any pending EMI?", sender: "user" },
    ])
    const [isTyping, setIsTyping] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Simulate typing effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTyping(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <Flex className={'h-full'} gap={10} direction={'column'} justify={'space-between'}>
                <Stack className={'mt-3 overflow-y-auto'} flex={1}>
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <Message key={message.id} text={message.text} sender={message.sender} />
                        ))}

                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>
                </Stack>
                <Flex gap={5}>
                    <TextInput classNames={{
                        input: "!rounded-lg border-gray-300 focus-within:border-gray-500 focus-within:ring-gray-500",
                    }} size={'md'} flex={1} placeholder={'Nhập tin nhắn...'}/>
                    <Button size={'md'}>
                        Gửi &nbsp;
                        <IconSend2/>
                    </Button>
                </Flex>
            </Flex>
        </>
    );
}

export default ChatBox;