"use client";

import { useState } from "react";
import { 
  Button, 
  Tabs, 
  Group, 
  Title, 
  Container
} from '@mantine/core';
import { Plus } from 'lucide-react';

// Import components
import { AlertComponent } from './components/AlertComponent';
import { ServicePackageList } from './components/ServicePackageList';
import { SubscriptionTable } from './components/SubscriptionTable';
import { PaymentHistoryTable } from './components/PaymentHistoryTable';
import { AddPackageModal } from './components/AddPackageModal';
import { EditPackageModal } from './components/EditPackageModal';

// Import types and utils
import { ServicePackage, NewPackageForm } from './types';
import { getInitialNewPackage } from './utils';

// Mock data for service packages
const mockServicePackages: ServicePackage[] = [
  {
    id: "1",
    name: "Gói Cơ Bản",
    description: "Gói dịch vụ cơ bản cho người dùng mới",
    price: 99000,
    discountPercentage: 0,
    duration: 30, // days
    features: ["Xem thời khóa biểu", "Xem lịch thi", "Thông báo cơ bản"],
    status: "active",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
    subscribers: 150,
  },
  {
    id: "2",
    name: "Gói Nâng Cao",
    description: "Gói dịch vụ nâng cao với nhiều tính năng hơn",
    price: 199000,
    discountPercentage: 10,
    duration: 30, // days
    features: ["Xem thời khóa biểu", "Xem lịch thi", "Thông báo nâng cao", "Xuất lịch PDF", "Tùy chỉnh giao diện"],
    status: "active",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
    subscribers: 75,
  },
  {
    id: "3",
    name: "Gói Premium",
    description: "Gói dịch vụ cao cấp với tất cả tính năng",
    price: 299000,
    discountPercentage: 15,
    duration: 30, // days
    features: ["Xem thời khóa biểu", "Xem lịch thi", "Thông báo nâng cao", "Xuất lịch PDF", "Tùy chỉnh giao diện", "Hỗ trợ ưu tiên", "Tính năng đặc biệt"],
    status: "active",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
    subscribers: 30,
  },
];

// Mock data for subscriptions
const mockSubscriptions = [
  {
    id: "1",
    userId: "user1",
    userName: "Nguyễn Văn A",
    userEmail: "nguyenvana@example.com",
    packageId: "1",
    packageName: "Gói Cơ Bản",
    startDate: "2023-01-01",
    endDate: "2023-01-31",
    status: "active" as const,
    paymentMethod: "VNPay",
    paymentStatus: "paid" as const,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Trần Thị B",
    userEmail: "tranthib@example.com",
    packageId: "2",
    packageName: "Gói Nâng Cao",
    startDate: "2023-01-15",
    endDate: "2023-02-14",
    status: "active" as const,
    paymentMethod: "Momo",
    paymentStatus: "paid" as const,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Lê Văn C",
    userEmail: "levanc@example.com",
    packageId: "3",
    packageName: "Gói Premium",
    startDate: "2023-01-20",
    endDate: "2023-02-19",
    status: "expired" as const,
    paymentMethod: "VNPay",
    paymentStatus: "paid" as const,
  },
];

// Mock data for payment history
const mockPaymentHistory = [
  {
    id: "1",
    userId: "user1",
    userName: "Nguyễn Văn A",
    userEmail: "nguyenvana@example.com",
    packageId: "1",
    packageName: "Gói Cơ Bản",
    amount: 99000,
    paymentMethod: "VNPay",
    paymentStatus: "success",
    transactionId: "TXN123456",
    date: "2023-01-01",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Trần Thị B",
    userEmail: "tranthib@example.com",
    packageId: "2",
    packageName: "Gói Nâng Cao",
    amount: 199000,
    paymentMethod: "Momo",
    paymentStatus: "success",
    transactionId: "TXN123457",
    date: "2023-01-15",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Lê Văn C",
    userEmail: "levanc@example.com",
    packageId: "3",
    packageName: "Gói Premium",
    amount: 299000,
    paymentMethod: "VNPay",
    paymentStatus: "success",
    transactionId: "TXN123458",
    date: "2023-01-20",
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>("packages");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPackageDialogOpen, setIsAddPackageDialogOpen] = useState(false);
  const [isEditPackageDialogOpen, setIsEditPackageDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [showAlert, setShowAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [newPackage, setNewPackage] = useState<NewPackageForm>(getInitialNewPackage());

  // Filter packages based on search query
  const filteredPackages = mockServicePackages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter subscriptions based on search query
  const filteredSubscriptions = mockSubscriptions.filter((sub) =>
    sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.packageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter payment history based on search query
  const filteredPaymentHistory = mockPaymentHistory.map(payment => ({
    ...payment,
    userEmail: payment.userEmail || ''
  })).filter((payment) =>
    payment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFeature = () => {
    setNewPackage({
      ...newPackage,
      features: [...newPackage.features, ""],
    });
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...newPackage.features];
    updatedFeatures.splice(index, 1);
    setNewPackage({
      ...newPackage,
      features: updatedFeatures,
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newPackage.features];
    updatedFeatures[index] = value;
    setNewPackage({
      ...newPackage,
      features: updatedFeatures,
    });
  };

  const handleAddPackage = () => {
    // In a real application, this would make an API call to add the package
    setShowAlert({ type: 'success', message: 'Gói dịch vụ đã được thêm thành công!' });
    setIsAddPackageDialogOpen(false);
    setNewPackage(getInitialNewPackage());
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleEditPackage = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setIsEditPackageDialogOpen(true);
  };

  const handleUpdatePackage = () => {
    // In a real application, this would make an API call to update the package
    setShowAlert({ type: 'success', message: 'Gói dịch vụ đã được cập nhật thành công!' });
    setIsEditPackageDialogOpen(false);
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleDeletePackage = (id: string) => {
    // In a real application, this would make an API call to delete the package
    setShowAlert({ type: 'success', message: 'Gói dịch vụ đã được xóa thành công!' });
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleSelectedPackageFeatureChange = (index: number, value: string) => {
    if (!selectedPackage) return;
    
    const updatedFeatures = [...selectedPackage.features];
    updatedFeatures[index] = value;
    setSelectedPackage({ ...selectedPackage, features: updatedFeatures });
  };

  const handleSelectedPackageAddFeature = () => {
    if (!selectedPackage) return;
    
    setSelectedPackage({
      ...selectedPackage,
      features: [...selectedPackage.features, ""],
    });
  };

  const handleSelectedPackageRemoveFeature = (index: number) => {
    if (!selectedPackage) return;
    
    const updatedFeatures = [...selectedPackage.features];
    updatedFeatures.splice(index, 1);
    setSelectedPackage({ ...selectedPackage, features: updatedFeatures });
  };

  return (
    <Container size="xl" py="xl">
      {showAlert && (
        <AlertComponent 
          type={showAlert.type} 
          message={showAlert.message} 
          onClose={() => setShowAlert(null)} 
        />
      )}

      <Group justify="space-between" mb="md">
        <Title order={1}>Quản lý gói dịch vụ</Title>
        <Button 
          leftSection={<Plus size={16} />}
          onClick={() => setIsAddPackageDialogOpen(true)}
        >
          Thêm gói dịch vụ
        </Button>
      </Group>

      <Tabs value={activeTab} onChange={(value) => value && setActiveTab(value)}>
        <Tabs.List grow>
          <Tabs.Tab value="packages">Gói dịch vụ</Tabs.Tab>
          <Tabs.Tab value="subscriptions">Đăng ký</Tabs.Tab>
          <Tabs.Tab value="payments">Lịch sử thanh toán</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="packages" pt="md">
          <ServicePackageList 
            packages={filteredPackages} 
            onEdit={handleEditPackage} 
            onDelete={handleDeletePackage} 
          />
        </Tabs.Panel>

        <Tabs.Panel value="subscriptions" pt="md">
          <SubscriptionTable subscriptions={filteredSubscriptions} />
        </Tabs.Panel>

        <Tabs.Panel value="payments" pt="md">
          <PaymentHistoryTable payments={filteredPaymentHistory} />
        </Tabs.Panel>
      </Tabs>

      <AddPackageModal 
        opened={isAddPackageDialogOpen} 
        onClose={() => setIsAddPackageDialogOpen(false)}
        newPackage={newPackage}
        onNewPackageChange={setNewPackage}
        onAddFeature={handleAddFeature}
        onRemoveFeature={handleRemoveFeature}
        onFeatureChange={handleFeatureChange}
        onAddPackage={handleAddPackage}
      />

      <EditPackageModal 
        opened={isEditPackageDialogOpen} 
        onClose={() => setIsEditPackageDialogOpen(false)}
        selectedPackage={selectedPackage}
        onSelectedPackageChange={setSelectedPackage}
        onAddFeature={handleSelectedPackageAddFeature}
        onRemoveFeature={handleSelectedPackageRemoveFeature}
        onFeatureChange={handleSelectedPackageFeatureChange}
        onUpdatePackage={handleUpdatePackage}
      />
    </Container>
  );
} 