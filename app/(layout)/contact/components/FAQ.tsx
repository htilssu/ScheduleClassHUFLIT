import React from "react";
import { Container, Title, Text, Paper, Grid } from "@mantine/core";
import Image from "next/image";
import {
  IconHelp,
  IconChevronDown,
  IconBuildingCommunity,
  IconUserCheck,
  IconHeadset,
  IconSchool,
  IconMessageReport,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question:
      "Website Xếp lịch học HUFLIT có phải là trang chính thức của trường không?",
    answer:
      "Không, đây là một dự án được phát triển bởi sinh viên HUFLIT với mục đích hỗ trợ cộng đồng. Website hoạt động độc lập và không phải là trang chính thức của trường.",
    icon: IconBuildingCommunity,
    image: "/images/Tuan&Shu02.png",
  },
  {
    question: "Làm thế nào để sử dụng website xếp lịch học?",
    answer:
      "Để sử dụng website, bạn cần đăng nhập bằng tài khoản HUFLIT của mình. Sau đó, bạn có thể xem lịch học, đăng ký môn học và quản lý lịch học của mình một cách dễ dàng.",
    icon: IconUserCheck,
    image: "/images/thongbao04.png",
  },
  {
    question: "Tôi gặp vấn đề khi sử dụng website, làm thế nào để được hỗ trợ?",
    answer:
      "Bạn có thể liên hệ với chúng tôi thông qua form liên hệ trên trang Contact hoặc gửi email trực tiếp đến địa chỉ trunghieu.dev88@gmail.com. Chúng tôi sẽ phản hồi và hỗ trợ bạn trong thời gian sớm nhất.",
    icon: IconHeadset,
    image: "/images/H2.png",
  },
  {
    question: "Website có hỗ trợ xếp lịch học cho tất cả các khoa không?",
    answer:
      "Hiện tại website đang hỗ trợ xếp lịch học cho các khoa chính của trường. Chúng tôi đang tiếp tục phát triển để mở rộng phạm vi hỗ trợ cho tất cả các khoa.",
    icon: IconSchool,
    image: "/images/thongbao01.png",
  },
  {
    question: "Làm thế nào để đóng góp ý kiến cho website?",
    answer:
      "Bạn có thể gửi ý kiến đóng góp thông qua form liên hệ hoặc tạo đánh giá ở phần dưới Trang Chủ của Web. Mọi ý kiến đóng góp đều được chúng tôi trân trọng và xem xét.",
    icon: IconMessageReport,
    image: "/images/thongbao02.png",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container size="xl" className="py-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2 mb-12"
      >
        <IconHelp size={32} className="text-orange-500" />
        <Title order={2} className="text-3xl font-bold">
          Câu hỏi thường gặp
        </Title>
      </motion.div>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sticky top-24"
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={
                  activeIndex !== null
                    ? faqData[activeIndex].image
                    : "/images/Tuan&Shu01.png"
                }
                alt="FAQ Illustration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Text size="lg" className="font-medium">
                  {activeIndex !== null
                    ? faqData[activeIndex].question
                    : "Chọn câu hỏi để xem chi tiết"}
                </Text>
              </div>
            </div>
          </motion.div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="w-full"
              >
                <Paper
                  shadow="md"
                  radius="md"
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    className="w-full p-4 flex items-center gap-4 bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
                  >
                    <div className="shrink-0">
                      <item.icon size={24} className="text-orange-500" />
                    </div>
                    <Text className="font-medium text-left grow">
                      {item.question}
                    </Text>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconChevronDown size={20} className="text-orange-500" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-white">
                          <Text className="text-gray-600">{item.answer}</Text>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Paper>
              </motion.div>
            ))}
          </motion.div>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default FAQ;
