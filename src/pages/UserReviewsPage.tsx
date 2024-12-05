import React, { useEffect, useState } from 'react';

const UserReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [error, setError] = useState("");

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
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    if (error) {
        return <div className="text-center text-red-500 mt-4">{error}</div>;
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Your Reviews</h1>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <ul className="space-y-4">
                    {reviews.map((review) => (
                        <li key={review.id} className="p-4 border rounded shadow">
                            <p><strong>Message:</strong> {review.message}</p>
                            <p><strong>Stars:</strong> {review.stars}</p>
                            <p><strong>Reviewer:</strong> {review.reviewerEmail}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserReviewsPage;
