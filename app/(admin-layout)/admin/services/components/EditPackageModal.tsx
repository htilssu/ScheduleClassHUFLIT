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
import { ServicePackage } from '../types';

interface EditPackageModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPackage: ServicePackage | null;
  onSelectedPackageChange: (pkg: ServicePackage) => void;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
  onFeatureChange: (index: number, value: string) => void;
  onUpdatePackage: () => void;
}

export function EditPackageModal({
  opened,
  onClose,
  selectedPackage,
  onSelectedPackageChange,
  onAddFeature,
  onRemoveFeature,
  onFeatureChange,
  onUpdatePackage
}: EditPackageModalProps) {
  if (!selectedPackage) return null;

  return (
    <Modal 
      opened={opened} 
      onClose={onClose}
      title="Chỉnh sửa gói dịch vụ"
      size="lg"
    >
      <Stack gap="md">
        <TextInput
          label="Tên gói"
          value={selectedPackage.name}
          onChange={(e) => onSelectedPackageChange({ ...selectedPackage, name: e.target.value })}
          required
        />
        
        <Textarea
          label="Mô tả"
          value={selectedPackage.description}
          onChange={(e) => onSelectedPackageChange({ ...selectedPackage, description: e.target.value })}
          required
        />
        
        <TextInput
          label="Giá (VNĐ)"
          type="number"
          value={selectedPackage.price}
          onChange={(e) => onSelectedPackageChange({ ...selectedPackage, price: parseInt(e.target.value) })}
          required
        />
        
        <TextInput
          label="Giảm giá (%)"
          type="number"
          min={0}
          max={100}
          value={selectedPackage.discountPercentage}
          onChange={(e) => onSelectedPackageChange({ ...selectedPackage, discountPercentage: parseInt(e.target.value) })}
          required
        />
        
        <TextInput
          label="Thời hạn (ngày)"
          type="number"
          value={selectedPackage.duration}
          onChange={(e) => onSelectedPackageChange({ ...selectedPackage, duration: parseInt(e.target.value) })}
          required
        />
        
        <Box>
          <Text fw={500} mb="xs">Tính năng</Text>
          <Stack gap="xs">
            {selectedPackage.features.map((feature, index) => (
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
                  disabled={selectedPackage.features.length === 1}
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
          value={selectedPackage.status}
          onChange={(value) => value && onSelectedPackageChange({ ...selectedPackage, status: value as 'active' | 'inactive' })}
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
        <Button onClick={onUpdatePackage}>
          Cập nhật
        </Button>
      </Group>
    </Modal>
  );
} 