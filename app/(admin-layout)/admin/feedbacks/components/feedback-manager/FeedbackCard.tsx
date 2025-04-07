import { Card, Group, Stack, Text, ActionIcon, Button, Menu, Tooltip, Textarea, Avatar } from "@mantine/core";
import { Star, MoreVertical, Trash2, Eye, MessageSquare, Copy, Check, Send } from "lucide-react";
import { Feedback } from "./types";
import { User } from "@/lib/hook/useUsers";

interface FeedbackCardProps {
    feedback: Feedback;
    onDelete: (id: string) => void;
    onViewUser: (user: { id: string; name: string | null; email: string }) => void;
    onReply: (feedbackId: string) => void;
    copiedEmail: string | null;
    setCopiedEmail: (email: string | null) => void;
    replyingTo: string | null;
    setReplyingTo: (id: string | null) => void;
    replyContent: string;
    setReplyContent: (content: string) => void;
}

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
        <Star
            key={index}
            className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
    ));
};

export const FeedbackCard = ({
    feedback,
    onDelete,
    onViewUser,
    onReply,
    copiedEmail,
    setCopiedEmail,
    replyingTo,
    setReplyingTo,
    replyContent,
    setReplyContent,
}: FeedbackCardProps) => {
    const handleCopyEmail = async (email: string) => {
        try {
            await navigator.clipboard.writeText(email);
            setCopiedEmail(email);
            setTimeout(() => setCopiedEmail(null), 2000);
        } catch (error) {
            console.error('Failed to copy email:', error);
        }
    };

    return (
        <Card withBorder radius="md" p="md">
            <Group justify="space-between" align="flex-start">
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Group gap="xs">
                        <Group gap={2}>
                            {renderStars(feedback.rating)}
                        </Group>
                    </Group>
                    <Group gap="xs">
                        <Avatar 
                            src={feedback.user.image}
                            alt={feedback.user.name || feedback.user.email}
                            radius="xl"
                            size="sm"
                        >
                            {(feedback.user.name || feedback.user.email).charAt(0).toUpperCase()}
                        </Avatar>
                        <Text size="sm" fw={500}>
                            {feedback.user.name || feedback.user.email}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {feedback.user.email}
                        </Text>
                        <Tooltip label={copiedEmail === feedback.user.email ? 'Đã sao chép!' : 'Sao chép email'}>
                            <ActionIcon
                                variant="subtle"
                                color={copiedEmail === feedback.user.email ? 'green' : 'gray'}
                                onClick={() => handleCopyEmail(feedback.user.email)}
                            >
                                {copiedEmail === feedback.user.email ? <Check size={14} /> : <Copy size={14} />}
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                    <Group gap={"6"}>
                        <Text size="sm" color={"gray"}>Nội dung:</Text>
                        <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                            {feedback.content}
                        </Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                        {new Date(feedback.createdAt).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                </Stack>
                <Button
                    leftSection={<MessageSquare size={12} />}
                    onClick={() => setReplyingTo(feedback.id)}
                    size={"compact-sm"}
                >
                    Phản hồi
                </Button>
                <Menu position="bottom-end" shadow="md" width={200}>
                    <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                            <MoreVertical size={16} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Thao tác</Menu.Label>
                        <Menu.Item 
                            leftSection={<Eye size={14} />}
                            onClick={() => onViewUser(feedback.user)}
                        >
                            Xem người dùng
                        </Menu.Item>
                        <Menu.Item 
                            leftSection={<Trash2 size={14} />}
                            color="red"
                            onClick={() => onDelete(feedback.id)}
                        >
                            Xóa phản hồi
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
            {replyingTo === feedback.id && (
                <Stack mt="md" gap="xs">
                    <Textarea
                        placeholder="Nhập nội dung phản hồi..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.currentTarget.value)}
                        minRows={3}
                    />
                    <Group justify="flex-start">
                        <Button
                            variant="subtle"
                            onClick={() => setReplyingTo(null)}
                            size="compact-md"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={() => onReply(feedback.id)}
                            size="compact-md"
                            leftSection={<Send size={16} />}
                        >
                            Gửi
                        </Button>
                    </Group>
                </Stack>
            )}
        </Card>
    );
}; 