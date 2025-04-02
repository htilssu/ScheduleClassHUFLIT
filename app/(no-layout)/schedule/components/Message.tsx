import {Bot} from "lucide-react";
import {Card, ScrollArea, Table, Text} from "@mantine/core";
import {ClassData} from "@/lib/types";

interface MessageProps {
    text: string;
    sender: "bot" | "user";
    classes?: ClassData[];
}

export function Message({text, sender, classes}: MessageProps) {
    return (
        <div
            className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
        >
            {sender === "bot" && (
                <div className="flex-shrink-0 mr-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white"/>
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
                    <div>
                        <Card shadow="sm" p="md" radius="md" withBorder>
                            <Text size="md" style={{whiteSpace: "pre-line"}}>
                                {text}
                            </Text>

                            {classes && classes.length > 0 && (
                                <div className="mt-4">
                                    <Text fw={700} size="sm" mb={5} c="blue">
                                        Danh sách lớp học:
                                    </Text>
                                    <ScrollArea h={classes.length > 3 ? 300 : undefined}>
                                        <Table
                                            striped
                                            highlightOnHover
                                            withTableBorder
                                            withColumnBorders
                                        >
                                            <Table.Thead>
                                                <Table.Tr>
                                                    <Table.Th>Môn học</Table.Th>
                                                    <Table.Th>Lớp</Table.Th>
                                                    <Table.Th>Giảng viên</Table.Th>
                                                    <Table.Th>Thời gian</Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                {classes.map((cls) => (
                                                    <Table.Tr key={cls.id}>
                                                        <Table.Td fw={500}>{cls.Subject.name}</Table.Td>
                                                        <Table.Td>{cls.classId}</Table.Td>
                                                        <Table.Td>{cls.Lecturer.name}</Table.Td>
                                                        <Table.Td>
                                                            {cls.learningSection.map((section, index) => (
                                                                <div key={index} className="text-sm">
                                  <span className="font-semibold">
                                    {section.weekDay}
                                  </span>{" "}
                                                                    ({section.time}) -{" "}
                                                                    <span className="text-gray-700">
                                    {" "}
                                                                        {section.room}
                                  </span>
                                                                </div>
                                                            ))}
                                                        </Table.Td>
                                                    </Table.Tr>
                                                ))}
                                            </Table.Tbody>
                                        </Table>
                                    </ScrollArea>
                                </div>
                            )}
                        </Card>
                    </div>
                ) : (
                    text
                )}
            </div>
            {sender === "user" && (
                <div className="flex-shrink-0 ml-2">
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
