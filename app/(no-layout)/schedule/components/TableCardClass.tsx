import { ActionIcon, Badge, Menu, Tooltip } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { LearningSection } from "@prisma/client";
import { ClassData } from "@/lib/types";
import { IconCopy } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";

export type TableClassData = Omit<ClassData, "learningSection"> & {
  learningSection: LearningSection;
};

export const TableClassCard = ({
  classData,
  onRemoveClass,
}: {
  classData: TableClassData;
  onRemoveClass?: (classId: string) => void;
}) => {
  const [isOpenMenuContext, setIsOpenMenuContext] = useState(false);

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setIsOpenMenuContext(true);
  }

  useEffect(() => {
    if (!isOpenMenuContext) return;

    const timeout = setTimeout(() => {
      setIsOpenMenuContext(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOpenMenuContext]);

  const badgeColor = classData.type === "Lý thuyết" ? "blue" : "green";
  const { copy, copied } = useClipboard();

  return (
    <Menu
      opened={isOpenMenuContext}
      closeDelay={3000}
      position="right-start"
      offset={7}
      withArrow
      arrowPosition="center"
    >
      <Menu.Target>
        <div
          onContextMenu={handleContextMenu}
          className={
            "border-2 hover:cursor-grabbing flex flex-col gap-2 py-3 px-2 w-full h-full border-violet-600 border-dashed"
          }
        >
          <h1 className={"font-bold text-base"}>{classData.Subject.name}</h1>
          <div
            className={
              "flex text-center flex-wrap gap-2 items-center justify-center"
            }
          >
            <Badge color={badgeColor}>{classData.type}</Badge>
            <Badge color={"pink"}>{classData.learningSection.room}</Badge>
            <Badge color={"yellow"}>{classData.learningSection.time}</Badge>
          </div>
          <h2 className={"text-base"}>{classData.Lecturer.name}</h2>
          <div className="flex justify-center items-center gap-1">
            <p className="select-text">{classData.classId}</p>
            <Tooltip
              label={copied ? "Copied!" : "Copy class ID"}
              position="top"
              withArrow
            >
              <ActionIcon
                variant="subtle"
                size="sm"
                onClick={() => copy(classData.classId)}
                color={copied ? "green" : "gray"}
              >
                <IconCopy size={14} />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            onRemoveClass?.(classData.id);
          }}
          color={"red"}
          leftSection={<IoTrash />}
          component="button"
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
