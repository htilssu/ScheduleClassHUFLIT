export interface Feedback {
    id: string;
    content: string;
    rating: number;
    createdAt: string;
    user: {
        id: string;
        name: string | null;
        email: string;
        image?: string;
    };
}

export interface RatingStat {
    rating: number;
    _count: {
        rating: number;
    };
}

export interface FeedbackResponse {
    feedbacks: Feedback[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    statistics: {
        ratingStats: RatingStat[];
        averageRating: number;
    };
}

export interface FeedbackManagerProps {
    data?: FeedbackResponse;
    isLoading: boolean;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    selectedRating: string | null;
    setSelectedRating: (rating: string | null) => void;
} 