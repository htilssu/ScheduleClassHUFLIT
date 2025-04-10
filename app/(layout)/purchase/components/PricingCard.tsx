import Link from "next/link";

interface PricingCardProps {
    plan: 'free' | 'pro' | 'vip';
    data: {
        title: string;
        price: number;
        annualPrice: number;
        originalPrice: number;
        annualOriginalPrice: number;
        discountPercent: number;
        annualDiscountPercent: number;
        features: string[];
        icon: string;
        color: string;
        buttonColor: string;
        popular: boolean;
    };
    isAnnual: boolean;
}

const PricingCard = ({ plan, data, isAnnual }: PricingCardProps) => {
    const price = isAnnual ? data.annualPrice : data.price;
    const originalPrice = isAnnual ? data.annualOriginalPrice : data.originalPrice;
    const discountPercent = isAnnual ? data.annualDiscountPercent : data.discountPercent;
    const formattedPrice = price.toLocaleString('vi-VN');
    const formattedOriginalPrice = originalPrice.toLocaleString('vi-VN');

    return (
        <div className={`relative rounded-2xl bg-gradient-to-b ${data.color} p-8 shadow-xl transition-all`}>
            {data.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Best for most students
                    </span>
                </div>
            )}
            
            <div className="text-center">
                <div className="text-4xl mb-4">{data.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h3>
                <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                        {price === 0 ? (
                            <span className="text-orange-500">Miễn phí</span>
                        ) : (
                            <>
                                <span className="text-3xl">{formattedPrice}</span>
                                <span className="text-2xl text-orange-500">₫</span>
                            </>
                        )}
                        <span className="text-lg text-gray-600 ml-1">/tháng</span>
                    </div>
                    {price !== 0 && (
                        <>
                            <div className="text-lg text-gray-500 line-through mb-2">
                                {formattedOriginalPrice}₫/tháng
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-base bg-orange-100 text-orange-600 font-bold px-4 py-1 rounded-full">
                                    Giảm {discountPercent}%
                                </div>
                                {isAnnual && (
                                    <div className="text-sm text-green-600 font-semibold">
                                        Tiết kiệm {(originalPrice - price).toLocaleString('vi-VN')}₫
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ul className="mt-8 space-y-4">
                {data.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>

            {plan !== 'free' && (
                <Link
                    href={"/profile/service"}
                    className={`block mt-6 w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 shadow-md hover:shadow-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600`}
                >
                    Nâng cấp ngay
                </Link>
            )}
        </div>
    );
};

export default PricingCard; 