export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

export const getInitialNewPackage = () => ({
  name: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  duration: 30,
  features: [""],
  status: "active" as const,
}); 