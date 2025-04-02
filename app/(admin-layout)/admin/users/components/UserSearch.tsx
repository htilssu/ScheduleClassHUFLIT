import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface UserSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const UserSearch = ({ searchQuery, onSearchChange }: UserSearchProps) => {
  return (
    <TextInput
      placeholder="Tìm kiếm người dùng..."
      leftSection={<IconSearch size={16} />}
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      mt="md"
      mb="md"
    />
  );
}; 