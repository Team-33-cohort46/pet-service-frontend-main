import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import star from '../assets/images/star.png';
import emptyStar from '../assets/images/empty-star.png';
import halfStar from '../assets/images/half-star.png';

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

const SittersReviewsPage: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (email) {
      fetchReviews(email);
    }
  }, [email]);

  const fetchReviews = async (email: string) => {
    try {
      const response = await fetch(`/api/auth/user/${email}`);
      if (!response.ok) throw new Error('Failed to fetch user reviews');
      const data = await response.json();
      if (!data.reviews) throw new Error('No reviews found for this user');
      setReviews(data.reviews);
    } catch (error) {
      console.error(error);
      alert('Error fetching reviews.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Reviews</h1>
      {loading ? (
        <div>Loading...</div>
      ) : reviews.length === 0 ? (
        <p>No reviews available for this user.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <p className="text-gray-700 text-sm">Reviewer: {review.reviewerEmail}</p>
              <p className="mt-2">{renderStars(review.stars)}</p>
              <p className="mt-2">{review.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SittersReviewsPage;
