import React from 'react';
import { Container, Title, Text, Grid, Paper, Image } from '@mantine/core';
import { FaLightbulb, FaUsers } from 'react-icons/fa';
import { TbTargetArrow } from "react-icons/tb";
import { FaGoogleScholar } from "react-icons/fa6";

const Story: React.FC = () => {
  return (
    <Container size="xl" className="py-16 relative">
      <Title order={2} className="text-3xl font-bold text-center mb-12">
        Câu chuyện của chúng tôi
      </Title>
      
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" radius="md" p="xl" className="h-full">
            <div className="flex items-center gap-4 mb-6">
              <FaLightbulb size={32} className="text-orange-500" />
              <Title order={3}>Ý tưởng</Title>
            </div>
            <Text className="text-gray-600">
              Website Xếp lịch học HUFLIT ra đời từ nhu cầu thực tế của sinh viên và giảng viên 
              trong việc quản lý và xếp lịch học. Chúng tôi nhận thấy việc xếp lịch học thủ công 
              đang gặp nhiều khó khăn và tốn thời gian.
            </Text>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" radius="md" p="xl" className="h-full">
            <div className="flex items-center gap-4 mb-6">
              <FaGoogleScholar size={32} className="text-orange-500" />
              <Title order={3}>Sứ mệnh</Title>
            </div>
            <Text className="text-gray-600">
              Chúng tôi mong muốn tạo ra một nền tảng thông minh, giúp việc xếp lịch học trở nên 
              dễ dàng và hiệu quả hơn. Website không chỉ giúp tiết kiệm thời gian mà còn góp phần 
              nâng cao chất lượng giáo dục.
            </Text>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" radius="md" p="xl" className="h-full">
            <div className="flex items-center gap-4 mb-6">
              <TbTargetArrow size={32} className="text-orange-500" />
              <Title order={3}>Tầm nhìn</Title>
            </div>
            <Text className="text-gray-600">
              Trong tương lai, chúng tôi sẽ không ngừng phát triển và cải thiện website để phục vụ 
              tốt hơn nhu cầu của người dùng, góp phần xây dựng một môi trường học tập hiện đại và 
              hiệu quả.
            </Text>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" radius="md" p="xl" className="h-full">
            <div className="flex items-center gap-4 mb-6">
              <FaUsers size={32} className="text-orange-500"/>
              <Title order={3}>Đội ngũ</Title>
            </div>
            <Text className="text-gray-600">
              Website được phát triển bởi đội ngũ sinh viên Huflit đam mê công nghệ. Chúng tôi luôn nỗ lực để mang đến
              những giải pháp tốt nhất cho cộng đồng HUFLIT.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Story; 