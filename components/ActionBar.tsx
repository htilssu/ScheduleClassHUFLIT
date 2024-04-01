import React from 'react';
import {Button} from "@mantine/core";
import {IconDeviceFloppy, IconTrash} from "@tabler/icons-react";

function ActionBar() {
    return (
        <div className={"p-2"}>
            <div className="bg-gray-200 h-14 rounded-md flex justify-end items-center p-3">
                <Button rightSection={<IconTrash/>} color="red" className="mr-2 hover:bg-red-500 text-center">Reset</Button>
                <Button rightSection={<IconDeviceFloppy/>} color="blue" className="text-center" variant="filled" >Lưu</Button>
            </div>
        </div>
    );
}

export default ActionBar;