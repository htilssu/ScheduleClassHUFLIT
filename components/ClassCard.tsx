import React from 'react';
import {Badge, Card, Group, Stack, Text} from "@mantine/core";
import {useDraggable} from "@dnd-kit/core";
import {ClassRoot} from "@/app/(layout)/schedule/page";

function ClassCard({classData}: { classData: ClassRoot }) {
    const {setNodeRef, transform, listeners, isDragging, attributes} = useDraggable({
        id: classData.id,
        data: {...classData}
    });


    return (
        <div ref={setNodeRef}  {...listeners} {...attributes} className={"mt-2 hover:cursor-grab overflow-hidden"}
             style={isDragging && transform ? {
                 transform: `translate(${transform.x}px, ${transform.y}px)`,
                 zIndex: 999,
                 position: "absolute",
                 cursor: "grab"
             } : {}}>
            <Card shadow="sm" padding="md" radius="md" withBorder>
                <Stack gap={"xs"}>
                    <Group>
                        <Badge color="green">{classData.weekDay}</Badge>
                        <Badge color="blue">{classData.time}</Badge>
                        <Badge color="pink">{classData.room}</Badge>
                    </Group>
                    <Text fw={500}>{classData.subject.name}</Text>
                    <Text size="sm" c="dimmed">
                        {classData.lecturer.name}
                    </Text>
                </Stack>



                {/*<Button color="blue" fullWidth mt="md" radius="md">
                    Thêm
                </Button>*/}
            </Card>
        </div>
    );
}

export default ClassCard;