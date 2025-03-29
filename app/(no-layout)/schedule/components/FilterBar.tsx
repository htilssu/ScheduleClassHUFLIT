'use client'

import React, {useState} from 'react';
import {Button, ComboboxItem, Drawer, Flex, Input, Menu, Select} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {IconBrandOpenai, IconRefresh, IconShare3} from '@tabler/icons-react';
import {ClassFilterState, filterSlice} from '@/lib/state/filter';
import {debounce} from 'lodash';
import {HomeIcon, MenuIcon, SettingsIcon} from 'lucide-react';
import Link from "next/link";
import {timeLineSlice} from "@/lib/state/timeline";
import {RootState, UserState} from "@/lib/state";
import {usePathname, useRouter} from 'next/navigation';
import ChatBox from './ChatBox';

const FilterBar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathName = usePathname();
    const [isOpenChat, setIsOpenChat] = useState(false)
    const user = useSelector<RootState, UserState>(state => state.user)
    const filter = useSelector<RootState, ClassFilterState>(state => state.filter)
    const {resetTimeLine} = timeLineSlice.actions
    const actions = filterSlice.actions
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const debouncedSearchChange = debounce((value: string) => {
        dispatch(actions.setClassName(value.toLowerCase()));
    }, 500);

    const debouncedTeacherChange = debounce((value: string) => {
        dispatch(actions.setTeacherName(value.toLowerCase()));
    }, 500);

    function handleTypeChange(e: string | null, _: ComboboxItem) {
        if (!e) return;
        dispatch(actions.setClassType(e));
    }

    function handleDayChange(e: string | null, _: ComboboxItem) {
        if (!e) return;
        dispatch(actions.setWeekDay(e));
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        debouncedSearchChange(e.target.value);
    }

    function handleSearchByTeacher(e: React.ChangeEvent<HTMLInputElement>) {
        debouncedTeacherChange(e.target.value);
    }

    function handleResetTimeLine() {
        dispatch(resetTimeLine());
    }

    function handleShareTimeLine() {
        if (!user) router.push(`/auth?redirect=${pathName}`);
    }

    return (
        <div className="mt-2 px-5">
            <Flex align="center" gap={8}>
                <Menu
                    shadow="md"
                    width={200}
                    opened={isOpenMenu}
                    onChange={setIsOpenMenu}
                >
                    <Menu.Target>
                        <MenuIcon
                            size={22}
                            className="cursor-pointer hover:text-orange-500"
                        />
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={<SettingsIcon size={18}/>}
                            component={Link}
                            href="/schedule/setup"
                        >
                            Cài đặt
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<HomeIcon size={18}/>}
                        >
                            <Link href={'/home'} prefetch>
                                Trang chủ
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconRefresh size={18}/>}
                            onClick={handleResetTimeLine}
                        >
                            Đặt lại lịch
                        </Menu.Item>
                        <Menu.Item
                            onClick={handleShareTimeLine}
                            leftSection={<IconShare3 stroke={2}/>}
                        >
                            Chia sẻ
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Flex gap={4} justify="center" flex={1}>
                    <Input onChange={handleSearchChange} placeholder="Tìm kiếm tên môn học"/>
                    <Input onChange={handleSearchByTeacher} placeholder="Tên giáo viên"/>
                    <Select
                        defaultValue="Tất cả"
                        onChange={handleTypeChange}
                        value={filter.classType}
                        data={["Tất cả", "Lý thuyết", "Thực hành"]}
                        placeholder="Chọn loại"
                    />
                    <Select
                        defaultValue="Tất cả các ngày"
                        value={filter.weekDay}
                        onChange={handleDayChange}
                        data={["Tất cả các ngày", "T2", "T3", "T4", "T5", "T6", "T7"]}
                        placeholder="Chọn ngày"
                    />
                </Flex>
                <Drawer classNames={{
                    body: "h-full"
                }} withCloseButton={false} flex={1} position={'bottom'} size={'lg'} opened={isOpenChat}
                        onClose={() => {
                            setIsOpenChat(false);
                        }}>
                    <ChatBox/>
                </Drawer>
                <Button onClick={() => {
                    setIsOpenChat(true)
                }} classNames={
                    {
                        root: "!bg-orange-500 !hover:bg-orange-600",
                    }
                }>
                    <IconBrandOpenai stroke={2}/>
                </Button>
            </Flex>
        </div>
    );
};

export default FilterBar;