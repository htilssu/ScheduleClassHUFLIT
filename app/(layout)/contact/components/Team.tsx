import React from 'react';
import {Container, Title, Text, SimpleGrid, Card, Image, Group, Avatar, Stack} from '@mantine/core';
import {FaGithub, FaLinkedin} from 'react-icons/fa';

const teamMembers = [
    {
        name: 'Tran Trung Hieu',
        role: 'Full Stack Developer',
        image: '/images/Tuan&Shu01.png',
        avatar: '/images/Tuan&Shu02.png',
        bio: 'Sinh viên năm 4 - Đại học Ngoại ngữ - Đại học Huế',
        github: 'https://github.com/Tuan980Blue',
        linkedin: 'https://linkedin.com/in/tuan980blue',
        skills: ['React', 'TypeScript', 'Node.js', 'MongoDB']
    },
    {
        name: 'Nguyen Anh Tuan',
        role: 'UI/UX Designer',
        image: '/images/Tuan&Shu02.png',
        avatar: '/images/Tuan&Shu02.png',
        bio: 'Sinh viên năm 4 - Đại học Ngoại ngữ - Đại học Huế',
        github: 'https://github.com/huongnt',
        linkedin: 'https://linkedin.com/in/huongnt',
        skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD']
    }
];

const Team: React.FC = () => {
    return (
        <Container size="xl" className="py-16 relative">
            <Title order={2} className="text-3xl font-bold text-center mb-12">
                Ai đứng sau website này?
            </Title>
            <Text className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Chúng tôi là một nhóm sinh viên đam mê công nghệ, mong muốn tạo ra những giải pháp hữu ích cho cộng
                đồng.
                Website Xếp lịch học HUFLIT ra đời từ nhu cầu thực tế của sinh viên.
            </Text>

            <SimpleGrid cols={{base: 1, sm: 2, md: 2}} spacing="xl">
                {teamMembers.map((member) => (
                    <Card key={member.name} shadow="md" radius="md" padding="xl"
                          className="group transition-all duration-300">
                      <Card.Section className="relative h-48 overflow-hidden">
                        <Image
                            src={member.image}
                            height={192}
                            alt={member.name}
                            className="object-cover w-auto h-full transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
                          <Avatar
                              src={member.avatar}
                              size={80}
                              radius={50}
                              className="border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </Card.Section>

                      <Stack className="mt-12 gap-4">
                        <Title order={3} className="text-center">{member.name}</Title>
                        <Text color="dimmed" size="sm" className="text-center">{member.role}</Text>
                        <Text size="sm" className="text-center text-gray-600">{member.bio}</Text>

                        <div className="flex flex-wrap gap-2 justify-center mt-4">
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
                                    <FaGithub size={24}/>
                                </a>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
                                >
                                    <FaLinkedin size={24}/>
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