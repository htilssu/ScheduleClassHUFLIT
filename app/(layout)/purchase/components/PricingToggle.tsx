interface PricingToggleProps {
    isAnnual: boolean;
    setIsAnnual: (value: boolean) => void;
}

const PricingToggle = ({ isAnnual, setIsAnnual }: PricingToggleProps) => {
    return (
        <div className="flex justify-center items-center space-x-4 md:mb-8 mb-2">
            <span className={`text-lg ${!isAnnual ? 'text-orange-600 font-semibold' : 'text-gray-600'}`}>
                Hàng tháng
            </span>
            <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-orange-200 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-2"
            >
                <span
                    className={`${
                        isAnnual ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-orange-600 font-semibold' : 'text-gray-600'}`}>
                Hàng năm
                {isAnnual && (
                    <span className="ml-2 text-sm text-orange-500">
                        (Tiết kiệm 20%)
                    </span>
                )}
            </span>
        </div>
    );
};

export default PricingToggle; 