import React from 'react';
import {Badge, Card, Group, Stack, Text} from "@mantine/core";
import {ClassRoot} from "@/app/(no-layout)/schedule/page";
import {useDraggable} from "@/hook/dnd/use-draggable";

function ClassCard({classData}: { classData: ClassRoot }) {
    const {setNodeRef, isDragging} = useDraggable(classData)


    return (
        <div ref={setNodeRef} className={"mt-2 hover:cursor-grabbing"}
        >
            <Card shadow="sm" padding="md" radius="md" withBorder>
                <Stack gap={"xs"}>
                    <Group>
                        <Badge color="green">{classData.weekDay}</Badge>
                        <Badge color="blue">{classData.time}</Badge>
                        <Badge color="pink">{classData.room}</Badge>
                        <Badge color="pink">{classData.type}</Badge>
                    </Group>
                    <Text fw={500}>{classData.Subject.name}</Text>
                    <Text size="sm" c="dimmed">
                        {classData.Lecturer.name}
                    </Text>
                </Stack>
            </Card>
        </div>
    );
}

export default ClassCard;