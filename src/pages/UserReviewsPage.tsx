import React, { useEffect, useState } from 'react';

const UserReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        try {
            const response = await fetch('/api/auth/me/reviews', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch reviews: ${response.status}`);
            }

            const reviewsData = await response.json();
            setReviews(reviewsData);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('Failed to fetch reviews.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const renderStars = (stars: number) => {
        return Array.from({ length: stars }, (_, i) => (
            <span key={i} className="text-yellow-500">★</span>
        ));
    };

    if (error) {
        return <div className="text-center text-red-500 mt-4">{error}</div>;
    }

    return (
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Your Reviews</h1>
            {loading ? (
                <div>Loading...</div>
            ) : reviews.length === 0 ? (
                <p>No reviews available for this user.</p>
            ) : (
                <div
                    className="relative flex flex-col items-center w-full"
                    style={{ maxHeight: '500px', overflowY: 'auto' }}
                >
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 p-4 rounded-lg shadow-md max-w-lg mx-auto mb-4 fade-in"
                            style={{
                                borderRadius: '20px',
                                backgroundColor: '#e1f5fe',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                animation: 'fadeIn 1.5s ease-in-out',
                            }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-semibold text-blue-600">{review.reviewerEmail}</p>
                                <div className="flex items-center">{renderStars(review.stars)}</div>
                            </div>
                            <p className="text-gray-800 text-sm">{review.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserReviewsPage;

