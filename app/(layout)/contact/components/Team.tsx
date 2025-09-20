import React from "react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Group,
  Avatar,
  Stack,
} from "@mantine/core";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaUserGraduate,
} from "react-icons/fa";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Tran Trung Hieu",
    role: "Software Engineer",
    image: "/images/Tuan&Shu01.png",
    avatar: "/images/Tuan&Shu02.png",
    bio: "Sinh viên năm 3 - Đại học Ngoại ngữ - Tin Học TP HCM",
    github: "https://github.com/htilssu",
    linkedin: "https://linkedin.com/in/tuan980blue",
    facebook: "https://www.facebook.com/htilssu.88",
    skills: ["React", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    name: "Nguyen Anh Tuan",
    role: "UI/UX Designer",
    image: "/images/Tuan&Shu02.png",
    avatar: "/images/Tuan&Shu02.png",
    bio: "Sinh viên năm 3 - Đại học Ngoại ngữ - Tin Học TP HCM",
    github: "https://github.com/htilssu",
    linkedin: "https://linkedin.com/in/huongnt",
    facebook: "https://www.facebook.com/tuananhhuflit",
    skills: ["UI Design", "UX Research", "Figma", "Adobe XD"],
  },
];

const Team: React.FC = () => {
  return (
    <Container size="xl" className="py-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title
          order={2}
          className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-3"
        >
          <FaUserGraduate className="text-orange-500" />
          Ai đứng sau website này?
        </Title>
        <p className="text-center text-gray-500 mb-12 max-w-4xl mx-auto text-lg">
          Chúng tôi là 2 sinh viên đam mê công nghệ, mong muốn tạo ra những giải
          pháp hữu ích cho cộng đồng. Website Xếp lịch học HUFLIT ra đời từ nhu
          cầu thực tế của sinh viên.
        </p>
      </motion.div>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="xl">
        {teamMembers.map((member) => (
          <Card
            key={member.name}
            shadow="md"
            radius="md"
            padding="xl"
            className="group transition-all duration-300 relative"
          >
            <Card.Section className="relative h-48 overflow-hidden">
              <Image
                src={member.image}
                height={192}
                alt={member.name}
                className="object-cover w-auto h-full transition-transform duration-700 group-hover:scale-110"
              />
            </Card.Section>
            <div className="absolute top-36 left-1/2 transform -translate-x-1/2 z-10">
              <Avatar
                src={member.avatar}
                size={80}
                radius={50}
                className="border-4 border-white shadow-lg transition-transform duration-300"
              />
            </div>
            <Stack className="lg:mt-14 mt-10">
              <Title order={3} className="text-center">
                {member.name}
              </Title>
              <Text color="dimmed" size="sm" className="text-center">
                {member.role}
              </Text>
              <Text size="sm" className="text-center text-gray-600">
                {member.bio}
              </Text>

              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <Group className="mt-4 justify-center">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
                >
                  <FaFacebook size={24} />
                </a>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Team;
