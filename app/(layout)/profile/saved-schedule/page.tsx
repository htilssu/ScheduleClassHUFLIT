import React from 'react';
import { Paper, Title, Text, Stack } from '@mantine/core';
import {TimeLineList} from "@/app/(layout)/schedule/components/TimelineList";

const SavedSchedulePage = () => {
    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <TimeLineList />
        </Paper>
    );
};

export default SavedSchedulePage; 