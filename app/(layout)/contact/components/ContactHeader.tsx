import React from 'react';
import { Title, Text, Container } from '@mantine/core';
import { FaFacebook, FaInstagramSquare, FaGithub } from "react-icons/fa";

const ContactHeader: React.FC = () => {
  return (
    <Container size="xl" className="py-16 relative">
      <div className="text-center max-w-3xl mx-auto">
        <Title order={1} className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
          Liên Hệ Với Chúng Tôi
        </Title>
        <Text className="text-xl text-gray-600 mb-8">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại tin nhắn hoặc liên hệ với chúng tôi qua các kênh mạng xã hội.
        </Text>
        
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/htilssu.88"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground/80 transition-all duration-300 hover:scale-110"
          >
            <FaFacebook size={40} className="w-12 text-blue-500 cursor-pointer" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground/80 transition-all duration-300 hover:scale-110"
          >
            <FaInstagramSquare size={40} className="w-12 text-red-500 cursor-pointer" />
          </a>
          <a
            href="https://github.com/Tuan980Blue"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground/80 transition-all duration-300 hover:scale-110"
          >
            <FaGithub size={40} className="w-12 text-gray-800 cursor-pointer" />
          </a>
        </div>
      </div>
    </Container>
  );
};

export default ContactHeader; 