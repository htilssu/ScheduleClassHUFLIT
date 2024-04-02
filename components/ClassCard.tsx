import React, {useEffect, useRef, useState} from 'react';
import {Class} from "@prisma/client";
import {Card, Image, Group, Text, Badge, Button} from "@mantine/core";
import {useDraggable} from "@dnd-kit/core";

function ClassCard({classData}: { classData: Class }) {
    const current = useRef(null);
    const {setNodeRef, transform, listeners, isDragging, attributes} = useDraggable({
        id: classData.id,
        data: {...classData}
    });



    return (
        <div ref={setNodeRef}  {...listeners} {...attributes}  className={"mt-2 hover:cursor-grab overflow-hidden"} style={isDragging && transform ? {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
            zIndex: 999,
            cursor: "grab"
        }: { }}>
            <Card shadow="sm" padding="md" radius="md" withBorder>
                <Card.Section component="a" href="https://mantine.dev/">

                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Lý thuyết đồ thị</Text>
                    <Group>
                        <Badge color="green">T3</Badge>
                        <Badge color="blue">2-4</Badge>
                        <Badge color="pink">B45</Badge>
                    </Group>
                </Group>

                <Text size="sm" c="dimmed">
                    Ths. Nguyễn Văn A
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md">
                    Thêm
                </Button>
            </Card>
        </div>
    );
}

export default ClassCard;