import React from 'react';
import {Paper, Stack, Text, Title} from "@mantine/core";

const Page = () => {
    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack>
                <Title order={2}>Dịch Vụ</Title>
                <Text>Các gói dịch vụ.</Text>
            </Stack>
        </Paper>
    );
};

export default Page;