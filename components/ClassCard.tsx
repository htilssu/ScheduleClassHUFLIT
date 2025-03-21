import React from 'react';
import {Badge, Card, Group, Stack, Text} from "@mantine/core";
import {useDraggable} from "@/hook/dnd/use-draggable";
import {ClassRoot} from '@/lib/model/Class';

function ClassCard({classData}: Readonly<{ classData: ClassRoot }>) {
    const {setNodeRef, isDragging} = useDraggable(classData)


    return (
        <div ref={setNodeRef} className={"mt-2 hover:cursor-grabbing"}
        >
            <Card shadow="sm" padding="md" radius="md" withBorder>
                <Stack gap={"xs"}>
                    <Group>
                        <Badge color="green">{classData.learningSection[0].weekDay}</Badge>
                        <Badge color="blue">{classData.learningSection[0].time}</Badge>
                        <Badge color="pink">{classData.learningSection[0].room}</Badge>
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