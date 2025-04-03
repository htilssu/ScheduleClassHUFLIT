"use client";

import { ClassData } from "@/lib/types";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useCallback } from "react";

interface ConflictModalProps {
  opened: boolean;
  onClose: () => void;
  onReplace: () => void;
  conflictingClass: ClassData | null;
  newClass: ClassData | null;
}

export default function ConflictModal({
  opened,
  onClose,
  onReplace,
  conflictingClass,
  newClass,
}: ConflictModalProps) {
  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleReplace = useCallback(() => {
    onReplace();
  }, [onReplace]);

  return (
    <Modal
      opened={opened}
      onClose={handleCancel}
      title="Lịch học bị trùng"
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      size="md"
    >
      <Text size="md" fw={500} mb="md" c="red">
        Lớp học bạn muốn thêm bị trùng lịch với lớp hiện có!
      </Text>

      {conflictingClass?.Subject?.name && (
        <div className="p-3 border border-gray-300 rounded-md mb-3 bg-gray-50">
          <Text size="sm" fw={700} mb="xs">
            Thông tin lớp hiện có:
          </Text>
          <Text size="sm" mb="xs">
            <span className="font-semibold">Tên môn:</span>{" "}
            {conflictingClass.Subject.name}
          </Text>
          <Text size="sm" mb="xs">
            <span className="font-semibold">Giảng viên:</span>{" "}
            {conflictingClass.Lecturer.name}
          </Text>
          <Text size="sm">
            <span className="font-semibold">Lịch học:</span>{" "}
            {conflictingClass.learningSection
              ?.map(
                (s) => `Thứ ${s.weekDay} (Tiết ${s.time}) - Phòng ${s.room}`
              )
              .join(", ")}
          </Text>
        </div>
      )}

      {newClass?.Subject?.name && (
        <div className="p-3 border border-gray-300 rounded-md mb-3 bg-blue-50">
          <Text size="sm" fw={700} mb="xs">
            Thông tin lớp mới:
          </Text>
          <Text size="sm" mb="xs">
            <span className="font-semibold">Tên môn:</span>{" "}
            {newClass.Subject.name}
          </Text>
          <Text size="sm" mb="xs">
            <span className="font-semibold">Giảng viên:</span>{" "}
            {newClass.Lecturer.name}
          </Text>
          <Text size="sm">
            <span className="font-semibold">Lịch học:</span>{" "}
            {newClass.learningSection
              ?.map(
                (s) => `Thứ ${s.weekDay} (Tiết ${s.time}) - Phòng ${s.room}`
              )
              .join(", ")}
          </Text>
        </div>
      )}

      <Text size="sm" mb="md" fw={500}>
        Bạn muốn thực hiện thao tác nào?
      </Text>

      <Group justify="flex-end" mt="xl">
        <Button variant="outline" onClick={handleCancel}>
          Hủy thêm
        </Button>
        <Button color="red" onClick={handleReplace}>
          Thay thế lớp cũ
        </Button>
      </Group>
    </Modal>
  );
}
