'use client'

import React, { useState } from "react";
import { FaStar, FaThumbsUp } from "react-icons/fa";

// Dummy feedback data
const feedbackData = [
    { id: 1, name: "Nguyen Anh Tuan", rating: 5, comment: "Xếp lịch rất nhanh!", date: "2024-03-25", likes: 4 },
    { id: 2, name: "Tran Trung Hieu", rating: 4, comment: "Xếp lịch nhanh nhưng giao diện chưa đẹp.", date: "2024-03-24", likes: 1 },
    { id: 3, name: "Ho Le Anh Toan", rating: 4, comment: "Cần hỗ trợ thêm tool đăng kí môn =)).", date: "2024-03-23", likes: 10 },
    { id: 4, name: "Anh Dao", rating: 5, comment: "Tôi muốn kết nối với bạn.", date: "2024-03-23", likes: 1 },
    { id: 5, name: "Le Toan", rating: 3, comment: "Cũng tạm được.", date: "2024-03-23", likes: 2 },
];

// StarRating Component
const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex text-yellow-500">
            {[...Array(5)].map((_, index) => (
                <FaStar key={index} className={index < rating ? "text-yellow-500" : "text-gray-300"} />
            ))}
        </div>
    );
};

// FeedbackSummary Component
const FeedbackSummary = ({ feedbacks }: { feedbacks: { rating: number }[] }) => {
    const totalReviews = feedbacks.length;
    const averageRating = (
        feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalReviews
    ).toFixed(1);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Đánh giá khách hàng</h2>
            <div className="flex items-center mt-2 gap-2">
                <span className="text-2xl font-semibold">{averageRating}/5</span>
                <StarRating rating={Math.round(Number(averageRating))}/>
            </div>
            <span className="text-gray-500">({totalReviews} đánh giá)</span>
        </div>
    );
};

// FeedbackItem Component
const FeedbackItem = ({feedback, onLike }: { feedback: { id: number; name: string; rating: number; comment: string; date: string; likes: number }, onLike: (id: number) => void }) => {
    return (
        <div className="p-4 border-b flex justify-between items-start">
            <div>
                <h3 className="font-semibold">{feedback.name}</h3>
                <StarRating rating={feedback.rating} />
                <p className="text-gray-700 mt-1">{feedback.comment}</p>
                <span className="text-sm text-gray-500">{feedback.date}</span>
            </div>
            <button onClick={() => onLike(feedback.id)} className="text-orange-500 flex items-center">
                <FaThumbsUp className="mr-1" /> {feedback.likes}
            </button>
        </div>
    );
};

// FeedbackList Component with Filter and Show More
const FeedbackList = ({ feedbacks, onLike }: { feedbacks: { id: number; name: string; rating: number; comment: string; date: string; likes: number }[], onLike: (id: number) => void }) => {
    const [filter, setFilter] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(3);

    const filteredFeedbacks = filter ? feedbacks.filter((f) => f.rating === filter) : feedbacks;
    const visibleFeedbacks = filteredFeedbacks.slice(0, visibleCount);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 3);
    };

    const handleShowLess = () => {
        setVisibleCount(3);
    };

    const isAllVisible = visibleCount >= filteredFeedbacks.length;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h2 className="text-lg font-bold">Phản hồi từ khách hàng</h2>
            <div className="flex gap-2 my-2">
                <button
                    className={`px-3 py-1 rounded border hover:border-orange-500 ${filter === null ? "bg-orange-500 text-white" : "bg-gray-100"}`}
                    onClick={() => setFilter(null)}
                >
                    Tất cả
                </button>
                {[5, 4, 3, 2, 1].map((star) => (
                    <button
                        key={star}
                        className={`px-3 py-1 rounded border hover:border-orange-500 ${filter === star ? "bg-orange-500 text-white" : "bg-gray-100"}`}
                        onClick={() => setFilter(filter === star ? null : star)}
                    >
                        {star} ★
                    </button>
                ))}
            </div>
            {visibleFeedbacks.length > 0 ? (
                visibleFeedbacks.map((feedback) => (
                    <FeedbackItem key={feedback.id} feedback={feedback} onLike={onLike}/>
                ))
            ) : (
                <p className="text-gray-500 text-center mt-2">Không có đánh giá nào.</p>
            )}
            {filteredFeedbacks.length > 3 && (
                <button
                    onClick={isAllVisible ? handleShowLess : handleShowMore}
                    className="p-3 text-cyan-500 hover:text-cyan-600 font-medium italic"
                >
                    {isAllVisible ? "Ẩn bớt" : "Xem thêm đánh giá"}
                </button>
            )}
        </div>
    );
};

// FeedbackForm Component
const FeedbackForm = ({onSubmit}: {
    onSubmit: (feedback: { id: number; name: string; rating: number; comment: string; date: string; likes: number }) => void }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id: Date.now(), name: "Bạn", rating, comment, date: new Date().toISOString().split("T")[0], likes: 0 });
        setRating(5);
        setComment("");
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-lg font-bold">Gửi đánh giá của bạn</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            className={index < rating ? "text-yellow-500" : "text-gray-300"}
                            onClick={() => setRating(index + 1)}
                        />
                    ))}
                </div>
                <textarea
                    className="w-full p-2 border border-orange-500 rounded mt-2"
                    placeholder="Nhận xét của bạn..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded mt-2">
                    Gửi đánh giá
                </button>
            </form>
            <p className="text-sm text-orange-500 p-4 font-extralight italic">Sự đánh giá của bạn sẽ góp phần cải thiện chất lượng dịch vụ và
                sản phẩm của chúng tôi.</p>
        </div>
    );
};

// Main Feedback Component
export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState(feedbackData);

    const addFeedback = (newFeedback: {
        id: number;
        name: string;
        rating: number; comment: string; date: string; likes: number }) => {
        setFeedbacks([newFeedback, ...feedbacks]);
    };

    const likeFeedback = (id: number) => {
        setFeedbacks(feedbacks.map((fb) => (fb.id === id ? { ...fb, likes: fb.likes + 1 } : fb)));
    };

    return (
        <div className="px-8 py-6">
            <FeedbackSummary feedbacks={feedbacks} />
            <FeedbackList feedbacks={feedbacks} onLike={likeFeedback} />
            <FeedbackForm onSubmit={addFeedback} />
        </div>
    );
}