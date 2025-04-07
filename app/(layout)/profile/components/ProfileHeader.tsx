"use client";

import { updateImageUserProfile } from "@/lib/actions/user-actions";
import useUser from "@/lib/hook/useUser";
import { setUserSuccess } from "@/lib/state/user";
import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  FileButton,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { Camera, Download, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProfileHeader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const dispatch = useDispatch();

  const { data: user } = useUser();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setAlert({
        type: "error",
        message: "Kích thước ảnh không được vượt quá 2MB",
      });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const result = await updateImageUserProfile(formData);

      if (result.success && result.user) {
        dispatch(setUserSuccess(result.user));
        setAlert({
          type: "success",
          message: "Cập nhật ảnh đại diện thành công",
        });
      } else {
        setAlert({
          type: "error",
          message: result.message || "Có lỗi xảy ra khi cập nhật ảnh đại diện",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Có lỗi xảy ra khi cập nhật ảnh đại diện",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Group>
          <Avatar src={user!.image || undefined} size="xl" radius="xl" />
          <Stack gap={0}>
            <Title order={3}>{user!.name || "Chưa có tên"}</Title>
            <Text c="dimmed">{user!.email}</Text>
            <Badge color="orange" variant="outline">
              {user!.role}
            </Badge>
          </Stack>
        </Group>
        <Group>
          <FileButton
            onChange={handleImageUpload}
            accept="image/png,image/jpeg,image/jpg"
            disabled={isUploading}
          >
            {(props) => (
              <Tooltip label="Thay đổi ảnh đại diện">
                <ActionIcon
                  {...props}
                  variant="light"
                  color="orange"
                  size="lg"
                  loading={isUploading}
                >
                  <Camera size={20} />
                </ActionIcon>
              </Tooltip>
            )}
          </FileButton>
          <Tooltip label="Chia sẻ hồ sơ">
            <ActionIcon variant="light" color="orange" size="lg">
              <Share2 size={20} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Tải xuống hồ sơ">
            <ActionIcon variant="light" color="orange" size="lg">
              <Download size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      {alert && (
        <Alert
          color={alert.type === "success" ? "green" : "red"}
          onClose={() => setAlert(null)}
          withCloseButton
        >
          {alert.message}
        </Alert>
      )}
    </Stack>
  );
};

export default ProfileHeader;
