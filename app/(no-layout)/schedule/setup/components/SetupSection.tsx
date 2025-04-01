"use client";

import React, { useCallback, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { get } from "@/lib/utils/request";
import { loadScheduleConfig } from "@/lib/utils/schedule_config";
import {
  Container,
  Paper,
  Title,
  Select,
  Button,
  Box,
  BackgroundImage,
  Stack,
  Group,
} from "@mantine/core";
import {
  IconSchool,
  IconCalendar,
  IconBook,
  IconArrowRight,
} from "@tabler/icons-react";

function SetupSection() {
  const form = useForm({
    initialValues: loadScheduleConfig(),
  });
  const router = useRouter();

  // State lưu dữ liệu từ API
  const [major, setMajor] = React.useState<any>(null);
  const [studyYear, setStudyYear] = React.useState<any>(null);
  const [semester, setSemester] = React.useState<any>(null);

  // Hàm lưu cấu hình vào localStorage và cookie
  const handleSaveClassConfig = useCallback(() => {
    localStorage.setItem("classConfig", JSON.stringify(form.values));
    document.cookie = `classConfig=${JSON.stringify(
      form.values
    )}; path=/; max-age=31536000`; // Lưu 1 năm
  }, [form.values]);

  // Gọi API khi component mount
  useEffect(() => {
    get("/v1/major").then((res) => setMajor(res.data));
    get("/v1/studyYear").then((res) => setStudyYear(res.data));
    get("/v1/semester").then((res) => setSemester(res.data));
  }, []);

  return (
    <Box className="min-h-screen flex items-center justify-center relative">
      {/* Background image */}
      <BackgroundImage
        src="/images/bg-setup.png"
        className="absolute inset-0 w-full h-full"
      />

      {/* Form container với hiệu ứng mờ và trong suốt */}
      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        className="relative bg-gray-800/90 w-full max-w-lg border border-orange-200/50 z-10"
      >
        {/* Tiêu đề */}
        <Title order={1} ta="center" className="mb-4">
          <Group justify="center" gap="xs">
            <IconSchool size={32} stroke={2} />
            <span>Thiết lập cài đặt</span>
          </Group>
        </Title>
        {/* Form chọn thông tin */}
        <Stack gap="lg">
          {/* Chọn chuyên ngành */}
          <Select
            label={
              <Group gap="xs">
                <IconBook size={20} stroke={2} />
                <span className="text-orange-500 font-medium">
                  Chuyên ngành
                </span>
              </Group>
            }
            placeholder={major ? "Chọn chuyên ngành" : "Đang tải..."}
            data={
              major?.map((value: { name: string }) => ({
                value: value.name,
                label: value.name,
              })) || []
            }
            value={form.values.major || null}
            onChange={(value) => form.setFieldValue("major", value || "")}
            className="mt-1"
            styles={{
              input: {
                borderColor: "rgb(253 186 116)",
                color: "rgb(234 88 12)",
                "&:focus": {
                  borderColor: "rgb(249 115 22)",
                },
                padding: "12px",
              },
            }}
          />

          {/* Chọn năm học */}
          <Select
            label={
              <Group gap="xs">
                <IconCalendar size={20} stroke={2} />
                <span className="text-orange-500 font-medium">Năm học</span>
              </Group>
            }
            placeholder={studyYear ? "Chọn năm học" : "Đang tải..."}
            data={
              studyYear?.map((value: { year: any }) => ({
                value: value.year,
                label: value.year,
              })) || []
            }
            value={form.values.year || null}
            onChange={(value) => form.setFieldValue("year", value || "")}
            className="mt-1"
            styles={{
              input: {
                borderColor: "rgb(253 186 116)",
                color: "rgb(234 88 12)",
                "&:focus": {
                  borderColor: "rgb(249 115 22)",
                },
                padding: "12px",
              },
            }}
          />

          {/* Chọn học kỳ */}
          <Select
            label={
              <Group gap="xs">
                <IconBook size={20} stroke={2} />
                <span className="text-orange-500 font-medium">Học kỳ</span>
              </Group>
            }
            placeholder={semester ? "Chọn học kỳ" : "Đang tải..."}
            data={
              semester?.map((value: { semester: any }) => ({
                value: value.semester,
                label: value.semester,
              })) || []
            }
            value={form.values.semester || null}
            onChange={(value) => form.setFieldValue("semester", value || "")}
            className="mt-1"
            styles={{
              input: {
                borderColor: "rgb(253 186 116)",
                color: "rgb(234 88 12)",
                "&:focus": {
                  borderColor: "rgb(249 115 22)",
                },
                padding: "12px",
              },
            }}
          />

          {/* Nút Tiếp tục */}
          <Button
            onClick={() => {
              handleSaveClassConfig();
              router.push("/schedule");
            }}
            fullWidth
            color="orange"
            rightSection={<IconArrowRight size={18} stroke={2} />}
            className="py-3 shadow-md"
          >
            Tiếp tục
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default SetupSection;
