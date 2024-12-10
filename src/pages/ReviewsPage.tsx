import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import star from '../asets/images/star.png';
import emptyStar from '../asets/images/empty-star.png';
import halfStar from '../asets/images/half-star.png';

interface Review {
  reviewerEmail: string;
  message: string;
  stars: number;
}

const renderStars = (rating: number) => {
  const filledStars = Math.floor(rating);
  const halfStarFlag = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (halfStarFlag ? 1 : 0);

  return (
      <div className="flex">
        {Array.from({ length: filledStars }).map((_, index) => (
            <img
                key={`filled-${index}`}
                src={star}
                alt="Filled Star"
                style={{ width: '20px', height: '20px', margin: '0 2px' }}
            />
        ))}
        {halfStarFlag && (
            <img
                src={halfStar}
                alt="Half Star"
                style={{ width: '20px', height: '20px', margin: '0 2px' }}
            />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
            <img
                key={`empty-${index}`}
                src={emptyStar}
                alt="Empty Star"
                style={{ width: '20px', height: '20px', margin: '0 2px' }}
            />
        ))}
      </div>
  );
};

const ReviewsPage: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (email) {
      fetchReviews(email);
    }
  }, [email]);

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        const unseenReviews = reviews.filter((review) => !visibleReviews.includes(review));
        if (unseenReviews.length > 0) {
          const randomReview = unseenReviews[Math.floor(Math.random() * unseenReviews.length)];
          setVisibleReviews((prev) => [...prev, randomReview]);
        }
      }, 200); // Добавляем новый отзыв каждые 3 секунды

      return () => clearInterval(interval);
    }
  }, [reviews, visibleReviews]);

  const fetchReviews = async (email: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/auth/user/reviews/${email}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user reviews');
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error('No reviews found for this user');
      }

      setReviews(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching reviews.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Sitter Reviews</h1>
        {loading ? (
            <div>Loading...</div>
        ) : reviews.length === 0 ? (
            <p>No reviews available for this user.</p>
        ) : (
            <div
                className="relative flex flex-col items-center w-full"
                style={{ maxHeight: '500px', overflowY: 'auto' }}
            >
              {visibleReviews.map((review, index) => (
                  <div
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mb-4 fade-in"
                      style={{
                        borderRadius: '20px',
                        backgroundColor: '#e1f5fe',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        animation: 'fadeIn 0.5s ease-in-out',
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

export default ReviewsPage;


