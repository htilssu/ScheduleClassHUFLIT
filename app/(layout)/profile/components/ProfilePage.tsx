'use client';

import React, { useState } from 'react';
import { Paper, Text, Stack, Grid } from '@mantine/core';
import useUser from '@/lib/hook/useUser';
import Loading from '@/app/loading';
import ProfileHeader from './ProfileHeader';
import PersonalInfo from './PersonalInfo';
import AdditionalInfo from './AdditionalInfo';
import EditProfileModal from './modals/EditProfileModal';
import ChangePasswordModal from './modals/ChangePasswordModal';
import { EditFormData } from '../types';

const ProfilePage = () => {
    const { data: user, loading } = useUser();
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [passwordModalOpened, setPasswordModalOpened] = useState(false);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-10">
                <Text size="xl" c="dimmed">Không tìm thấy thông tin người dùng</Text>
            </div>
        );
    }

    const handleEditSubmit = (data: EditFormData) => {
        // TODO: Implement API call to update user data
        console.log('Updating user data:', data);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Stack gap="xl">
                <Paper shadow="sm" p="xl" radius="md">
                    <ProfileHeader user={user} />
                </Paper>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <PersonalInfo user={user} onEdit={() => setEditModalOpened(true)} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <AdditionalInfo 
                            user={user} 
                            onPasswordChange={() => setPasswordModalOpened(true)} 
                        />
                    </Grid.Col>
                </Grid>
            </Stack>
            <EditProfileModal
                opened={editModalOpened}
                onClose={() => setEditModalOpened(false)}
                user={user}
                onSubmit={handleEditSubmit}
            />
            <ChangePasswordModal
                opened={passwordModalOpened}
                onClose={() => setPasswordModalOpened(false)}
            />
        </div>
    );
};

export default ProfilePage;
