import { 
  Modal, 
  Stack, 
  TextInput, 
  Textarea, 
  Box, 
  Text, 
  Group, 
  Button, 
  ActionIcon, 
  Select 
} from '@mantine/core';
import { Plus, Trash2 } from 'lucide-react';
import { NewPackageForm } from '../types';

interface AddPackageModalProps {
  opened: boolean;
  onClose: () => void;
  newPackage: NewPackageForm;
  onNewPackageChange: (newPackage: NewPackageForm) => void;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
  onFeatureChange: (index: number, value: string) => void;
  onAddPackage: () => void;
}

export function AddPackageModal({
  opened,
  onClose,
  newPackage,
  onNewPackageChange,
  onAddFeature,
  onRemoveFeature,
  onFeatureChange,
  onAddPackage
}: AddPackageModalProps) {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose}
      title="Thêm gói dịch vụ mới"
      size="lg"
    >
      <Stack gap="md">
        <TextInput
          label="Tên gói"
          value={newPackage.name}
          onChange={(e) => onNewPackageChange({ ...newPackage, name: e.target.value })}
          required
        />
        
        <Textarea
          label="Mô tả"
          value={newPackage.description}
          onChange={(e) => onNewPackageChange({ ...newPackage, description: e.target.value })}
          required
        />
        
        <TextInput
          label="Giá (VNĐ)"
          type="number"
          value={newPackage.price}
          onChange={(e) => onNewPackageChange({ ...newPackage, price: parseInt(e.target.value) })}
          required
        />
        
        <TextInput
          label="Giảm giá (%)"
          type="number"
          min={0}
          max={100}
          value={newPackage.discountPercentage}
          onChange={(e) => onNewPackageChange({ ...newPackage, discountPercentage: parseInt(e.target.value) })}
          required
        />
        
        <TextInput
          label="Thời hạn (ngày)"
          type="number"
          value={newPackage.duration}
          onChange={(e) => onNewPackageChange({ ...newPackage, duration: parseInt(e.target.value) })}
          required
        />
        
        <Box>
          <Text fw={500} mb="xs">Tính năng</Text>
          <Stack gap="xs">
            {newPackage.features.map((feature, index) => (
              <Group key={index} gap="xs">
                <TextInput
                  value={feature}
                  onChange={(e) => onFeatureChange(index, e.target.value)}
                  placeholder="Nhập tính năng"
                  style={{ flex: 1 }}
                />
                <ActionIcon 
                  color="red" 
                  variant="light"
                  onClick={() => onRemoveFeature(index)}
                  disabled={newPackage.features.length === 1}
                >
                  <Trash2 size={16} />
                </ActionIcon>
              </Group>
            ))}
            <Button
              variant="light"
              leftSection={<Plus size={16} />}
              onClick={onAddFeature}
              fullWidth
            >
              Thêm tính năng
            </Button>
          </Stack>
        </Box>
        
        <Select
          label="Trạng thái"
          value={newPackage.status}
          onChange={(value) => value && onNewPackageChange({ ...newPackage, status: value as 'active' | 'inactive' })}
          data={[
            { value: 'active', label: 'Hoạt động' },
            { value: 'inactive', label: 'Không hoạt động' }
          ]}
        />
      </Stack>

      <Group justify="flex-end" mt="xl">
        <Button variant="light" onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={onAddPackage}>
          Thêm gói
        </Button>
      </Group>
    </Modal>
  );
} 