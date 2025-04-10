export interface ServiceFeature {
    title: string;
    price: string;
    salePrice: string | null;
    discount: string | null;
    yearlyDiscount: string | null;
    features: string[];
    icon: any;
    color: string;
    status: string;
    yearlyPrice?: string;
    yearlySalePrice?: string;
} 