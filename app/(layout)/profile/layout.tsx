'use client';

import React from 'react';
import { Container, Grid } from '@mantine/core';
import ProfileSideBar from './components/ProfileSideBar';

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Container fluid className="py-8">
                <Grid className="min-h-[calc(100vh-4rem)]">
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <div className="sticky top-20">
                            <ProfileSideBar />
                        </div>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 9 }}>
                        <div className="min-h-[calc(100vh-4rem)]">
                            {children}
                        </div>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    );
} 