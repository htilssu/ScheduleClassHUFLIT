import React from "react";
import dynamic from "next/dynamic";
import { Container, Box, Title, Text } from "@mantine/core";
import contact from "./Contact.json";
import ContactForm from "./ContactForm";

// Tải Lottie chỉ trên client-side
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ContactSection: React.FC = () => {
  return (
    <Container size="xl" className="py-16 relative">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 bg-white rounded-2xl p-8 shadow-xl">
        <Box className="md:w-1/2">
          <Title order={2} className="text-3xl font-extrabold mb-4 text-gray-900">
            Gửi Tin Nhắn
          </Title>
          <Text className="mb-8 text-gray-600 text-lg">
            Hãy để lại tin nhắn cho chúng tôi. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
          </Text>
          <Lottie
            animationData={contact}
            className="w-[350px] mx-auto lg:w-[500px]"
          />
        </Box>
        <Box className="md:w-1/2 w-full">
          <ContactForm />
        </Box>
      </div>
    </Container>
  );
};

export default ContactSection; 