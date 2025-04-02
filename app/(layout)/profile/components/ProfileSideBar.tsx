'use client';

import React from 'react';
import { Paper, Stack, Text, Group, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import {
    User,
    ShieldPlus,
    Settings,
    Bell,
    Bookmark,
    LockKeyholeOpen
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface NavbarLinkProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const NavbarLink = ({ icon, label, active, onClick }: NavbarLinkProps) => {
    return (
        <UnstyledButton
            onClick={onClick}
            className={`w-full rounded-md p-2 transition-colors ${
                active ? 'bg-orange-50 text-orange-600' : 'hover:bg-orange-50/50'
            }`}
        >
            <Group>
                <ThemeIcon variant={active ? 'filled' : 'light'} color={active ? 'orange' : 'gray'} size="md">
                    {icon}
                </ThemeIcon>
                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    );
};

const ProfileSideBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const links = [
        { icon: <User size={20} />, label: 'Thông tin cá nhân', href: '/profile' },
        { icon: <ShieldPlus  size={20} />, label: 'Quản lý tài khoản', href: '/profile/activity' },
        { icon: <Bookmark size={20} />, label: 'Lịch học đã lưu', href: '/profile/saved-schedule' },
        { icon: <Bell size={20} />, label: 'Thông báo', href: '/profile/notifications' },
        { icon: <LockKeyholeOpen  size={20} />, label: 'Dịch vụ', href: '/profile/service' },
        { icon: <Settings size={20} />, label: 'Cài đặt', href: '/profile/settings' },
    ];

    return (
        <Paper 
            shadow="sm" 
            p="md" 
            radius="md" 
            withBorder 
            style={{
                position: 'sticky',
                top: rem(70),
                height: 'fit-content'
            }}
        >
            <Stack gap="xs">
                {links.map((link) => (
                    <NavbarLink
                        key={link.href}
                        icon={link.icon}
                        label={link.label}
                        active={pathname === link.href}
                        onClick={() => router.push(link.href)}
                    />
                ))}
            </Stack>
        </Paper>
    );
};

export default ProfileSideBar; 