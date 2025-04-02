"use client";

import React, { useState } from "react";
import { Paper, Text, Stack, Grid } from "@mantine/core";
import useUser from "@/lib/hook/useUser";
import Loading from "@/app/loading";
import ProfileHeader from "./ProfileHeader";
import PersonalInfo from "./PersonalInfo";
import AdditionalInfo from "./AdditionalInfo";
import EditProfileModal from "./modals/EditProfileModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import { useDispatch } from "react-redux";
import { setUserSuccess, User } from "@/lib/state/user";
import { notifications } from "@mantine/notifications";
import { changePassword } from "@/app/actions/auth-actions";

const ProfilePage = () => {
  const { data: user, loading } = useUser();
  const dispatch = useDispatch();
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [passwordModalOpened, setPasswordModalOpened] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <Text size="xl" c="dimmed">
          Không tìm thấy thông tin người dùng
        </Text>
      </div>
    );
  }

  const handleEditSubmit = (updatedUser: User) => {
    dispatch(setUserSuccess(updatedUser));
  };

  const handlePasswordChange = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      // Validate dữ liệu trước khi gửi
      if (!data.currentPassword || data.currentPassword.trim() === "") {
        return { success: false, message: "Vui lòng nhập mật khẩu hiện tại" };
      }

      if (!data.newPassword || data.newPassword.trim() === "") {
        return { success: false, message: "Vui lòng nhập mật khẩu mới" };
      }

      const result = await changePassword(data);

      if (result.success) {
        notifications.show({
          title: "Thành công",
          message: result.message || "Đổi mật khẩu thành công",
          color: "green",
        });
        setPasswordModalOpened(false);
        return result;
      } else {
        return result; // Trả về lỗi để modal xử lý
      }
    } catch (error) {
      console.error("Error changing password:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại sau.",
      };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Stack gap="xl">
        <Paper shadow="sm" p="xl" radius="md">
          <ProfileHeader user={user} />
        </Paper>
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <PersonalInfo user={user} onEdit={() => setEditModalOpened(true)} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <AdditionalInfo
              user={user}
              onPasswordChange={() => setPasswordModalOpened(true)}
            />
          </Grid.Col>
        </Grid>
      </Stack>
      <EditProfileModal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        user={user}
        onSubmit={handleEditSubmit}
      />
      <ChangePasswordModal
        opened={passwordModalOpened}
        onClose={() => setPasswordModalOpened(false)}
        onSubmit={handlePasswordChange}
      />
    </div>
  );
};

export default ProfilePage;
