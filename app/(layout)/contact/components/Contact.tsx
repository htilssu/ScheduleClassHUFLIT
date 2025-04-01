"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaFacebook, FaInstagramSquare, FaGithub } from "react-icons/fa";
import contact from "./Contact.json";
import {
  TextInput,
  Textarea,
  Button,
  Select,
  Paper,
  Title,
  Text,
  Group,
  Container,
  Box,
  Notification,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import { MdContactMail } from "react-icons/md";

// Tải Lottie chỉ trên client-side
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type ContactProps = {};

const Contact: React.FC<ContactProps> = () => {
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

  // Xử lý gửi email
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

  // Xử lý timeout cho sentSuccess
  useEffect(() => {
    if (sentSuccess) {
      const timer = setTimeout(() => setSentSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [sentSuccess]);

  return (
    <section id="contact" className="z-50 py-10 px-5 md:px-0">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/bg-white-orange-and-blue.png)",
          backgroundAttachment: "fixed",
          opacity: 2,
          zIndex: 0,
        }}
      />
      <Container size="xl" className="mb-16 mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Box className="md:w-1/2 mb-8 ml-2 md:mb-0">
            <Title
              order={2}
              className="text-3xl font-extrabold mb-3 text-gray-900"
            >
              Get in Touch
            </Title>
            <Text className="mb-4 text-gray-900">
              We are always open to new opportunities and collaboration. Feel
              free to reach out!
            </Text>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/htilssu.88"
                className="text-foreground/60 hover:text-foreground/80"
              >
                <FaFacebook
                  size={40}
                  className="w-12 text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
                />
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-foreground/80"
              >
                <FaInstagramSquare
                  size={40}
                  className="w-12 text-red-500 cursor-pointer transition-transform transform hover:scale-110"
                />
              </a>
              <a
                href="https://github.com/Tuan980Blue"
                className="text-foreground/60 hover:text-foreground/80"
              >
                <FaGithub
                  size={40}
                  className="w-12 text-gray-800 cursor-pointer transition-transform transform hover:scale-110"
                />
              </a>
            </div>
            <Lottie
              animationData={contact}
              className="w-[350px] mx-auto lg:w-[500px]"
            />
          </Box>
          <Paper
            shadow="lg"
            radius="md"
            p="xl"
            withBorder
            className="w-full md:w-1/2 border-orange-300 shadow-orange-500/50"
          >
            <Title
              order={1}
              className="text-orange-500 text-4xl font-bold flex justify-center items-center gap-4"
            >
              <MdContactMail /> Contact Us
            </Title>

            {sentSuccess && (
              <Notification
                icon={<IconCheck size="1.1rem" />}
                color="green"
                title="Thành công!"
                onClose={() => setSentSuccess(false)}
                mb="md"
              >
                Tin nhắn đã được gửi thành công!
              </Notification>
            )}

            <form onSubmit={form.onSubmit(handleSendMessage)}>
              <TextInput
                label="Your Name"
                placeholder="Full Name"
                mt="md"
                withAsterisk
                {...form.getInputProps("name")}
              />

              <TextInput
                label="Your Email"
                placeholder="Email"
                mt="md"
                withAsterisk
                {...form.getInputProps("email")}
              />

              <Select
                label="Chủ đề"
                placeholder="Chọn chủ đề"
                mt="md"
                data={[
                  { value: "Hỗ trợ", label: "Hỗ trợ" },
                  { value: "Hợp tác", label: "Hợp tác" },
                  { value: "Phản hồi", label: "Phản hồi" },
                  { value: "Khác", label: "Khác" },
                ]}
                {...form.getInputProps("subject")}
              />

              <Textarea
                label="Message Content"
                placeholder="Enter Your Message"
                minRows={4}
                mt="md"
                withAsterisk
                {...form.getInputProps("message")}
              />

              <Button
                type="submit"
                fullWidth
                mt="xl"
                loading={isSending}
                color="orange"
              >
                {isSending ? "Đang gửi..." : "Gửi tin nhắn"}
              </Button>
            </form>
          </Paper>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
