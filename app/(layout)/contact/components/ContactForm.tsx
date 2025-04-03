import React, { useState, useEffect } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Select,
  Paper,
  Notification,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import { MdContactMail } from "react-icons/md";

const ContactForm: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "Hỗ trợ",
      message: "",
    },
    validate: {
      name: (value) =>
        value.trim().length < 1 ? "Vui lòng nhập tên của bạn" : null,
      email: isEmail("Email không hợp lệ"),
      message: (value) =>
        value.trim().length < 1 ? "Vui lòng nhập nội dung tin nhắn" : null,
    },
  });

  const [emailData, setEmailData] = useState<typeof form.values | null>(null);

  const handleSendMessage = (values: typeof form.values) => {
    setIsSending(true);
    setEmailData(values);
  };

  useEffect(() => {
    if (emailData && isSending) {
      const { name, email, subject, message } = emailData;

      const timer = setTimeout(() => {
        window.location.href = `mailto:tuanmeo980provip@gmail.com?subject=${subject} from ${name}&body=${message} (Email: ${email})`;
        setIsSending(false);
        setSentSuccess(true);
        form.reset();
        setEmailData(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [emailData, isSending, form]);

  useEffect(() => {
    if (sentSuccess) {
      const timer = setTimeout(() => setSentSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [sentSuccess]);

  return (
    <Paper
      shadow="lg"
      radius="md"
      p="xl"
      withBorder
      className="w-full border-orange-300 shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-8">
        <MdContactMail className="text-4xl text-orange-500" />
        <h3 className="text-2xl font-bold text-gray-900">Gửi tin nhắn</h3>
      </div>

      {sentSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="green"
          title="Thành công!"
          onClose={() => setSentSuccess(false)}
          mb="md"
          className="animate-fade-in"
        >
          Tin nhắn đã được gửi thành công!
        </Notification>
      )}

      <form onSubmit={form.onSubmit(handleSendMessage)} className="space-y-6">
        <TextInput
          label="Họ và tên"
          placeholder="Nhập họ và tên của bạn"
          size="md"
          withAsterisk
          className="transition-all duration-300 hover:shadow-md"
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Email"
          placeholder="Nhập email của bạn"
          size="md"
          withAsterisk
          className="transition-all duration-300 hover:shadow-md"
          {...form.getInputProps("email")}
        />

        <Select
          label="Chủ đề"
          placeholder="Chọn chủ đề"
          size="md"
          data={[
            { value: "Hỗ trợ", label: "Hỗ trợ" },
            { value: "Hợp tác", label: "Hợp tác" },
            { value: "Phản hồi", label: "Phản hồi" },
            { value: "Khác", label: "Khác" },
          ]}
          className="transition-all duration-300 hover:shadow-md"
          {...form.getInputProps("subject")}
        />

        <Textarea
          label="Nội dung"
          placeholder="Nhập nội dung tin nhắn"
          minRows={4}
          size="md"
          withAsterisk
          className="transition-all duration-300 hover:shadow-md"
          {...form.getInputProps("message")}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isSending}
          color="orange"
          className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          {isSending ? "Đang gửi..." : "Gửi tin nhắn"}
        </Button>
      </form>
    </Paper>
  );
};

export default ContactForm; 