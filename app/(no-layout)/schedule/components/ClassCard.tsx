"use client";

import React, { useEffect } from "react";
import { Badge, Card, Flex, Stack, Text } from "@mantine/core";
import { useDraggable } from "@/lib/hook/use-draggable";
import { ClassData } from "@/lib/types";
import { useDndContext } from "@/lib/hook/use-dnd-context";

function ClassCard({ classData }: Readonly<{ classData: ClassData }>) {
  const { setNodeRef, isDragging } = useDraggable(classData);
  const dndContext = useDndContext();

  const badgeColor = classData.type === "Lý thuyết" ? "blue" : "green";

  // Theo dõi khi bắt đầu và kết thúc drag
  useEffect(() => {
    if (isDragging) {
      // Phát sự kiện khi bắt đầu kéo
      const event = new CustomEvent("class-card-drag", {
        detail: {
          isDragging: true,
          classData: classData,
        },
      });
      document.dispatchEvent(event);
    } else {
      // Phát sự kiện khi kết thúc kéo
      const event = new CustomEvent("class-card-drag", {
        detail: {
          isDragging: false,
          classData: null,
        },
      });
      document.dispatchEvent(event);
    }
  }, [isDragging, classData]);

  return (
    <div ref={setNodeRef} className={"mt-2 hover:cursor-grabbing"}>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Stack gap={"xs"}>
          <Flex justify={"space-between"}>
            <Stack>
              {classData.learningSection.map((item) => (
                <Flex key={item.weekDay} gap={5}>
                  <Badge color="green">{"T" + item.weekDay}</Badge>
                  <Badge color="blue">{item.time}</Badge>
                </Flex>
              ))}
            </Stack>
            <Flex justify={"end"}>
              <Badge
                color={badgeColor}
              >{`${classData.learningSection[0].room} / ${classData.type}`}</Badge>
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
