'use client'

import React from 'react';
import {Badge, Card, Flex, Stack, Text} from "@mantine/core";
import {useDraggable} from "@/lib/hook/use-draggable";
import {ClassData} from '@/lib/types';

function ClassCard({classData}: Readonly<{ classData: ClassData }>) {
    const {setNodeRef, isDragging} = useDraggable(classData)


    return (
        <div ref={setNodeRef} className={"mt-2 hover:cursor-grabbing"}
        >
            <Card shadow="sm" padding="md" radius="md" withBorder>
                <Stack gap={"xs"}>
                    <Flex justify={'space-between'}>
                        <Stack>
                            {classData.learningSection.map((item) => (
                                <Flex key={item.weekDay} gap={5}>
                                    <Badge color="green">{"T" + item.weekDay}</Badge>
                                    <Badge color="blue">{item.time}</Badge>
                                </Flex>
                            ))}
                        </Stack>
                        <Flex justify={'end'}>
                            <Badge color="pink">{`${classData.learningSection[0].room} / ${classData.type}`}</Badge>
                        </Flex>
                    </Flex>
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