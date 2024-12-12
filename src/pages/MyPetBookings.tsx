import React, { useEffect, useState } from 'react';

interface Booking {
  id: number;
  status: string;
  serviceTitle: string;
  petName: string;
  price: number;
  startDate: string;
  endDate: string;
  ownerId: number;
  sitterId: number;
  ownerName: string;
  sitterName: string;
}

const MyPetBookings: React.FC = () => {
  const [ownerBookings, setOwnerBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bookings/as-owner', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const ownerData = await response.json();
          setOwnerBookings(ownerData);
        } else {
          throw new Error('Failed to fetch bookings');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [authToken]);

  const changeStatus = async (bookingId: number, newStatus: string, booking: Booking) => {
    try {
      const endpoint = `/api/bookings/${bookingId}`;
      const body = JSON.stringify({ status: newStatus });

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body,
      });

      if (response.ok) {
        setOwnerBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
        setNotification(`The booking status has been changed to "${newStatus}".`);
      } else {
        throw new Error('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while changing booking status.');
    }
  };

  const isReviewAvailable = (endDate: string) => {
    const currentDate = new Date();
    const endBookingDate = new Date(endDate);
    return currentDate > endBookingDate;
  };

  const canCancelBooking = (startDate: string) => {
    const currentDate = new Date();
    const startBookingDate = new Date(startDate);
    return currentDate < startBookingDate; // Отмена доступна только до начала бронирования
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">My Pet Bookings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {ownerBookings.map((booking) => (
            <div
              key={booking.id}
              className={`border p-4 mb-4 ${booking.status === 'cancelled' ? 'opacity-50 bg-gray-200' : ''}`}
            >
              <h3 className="text-xl font-bold">Title: {booking.serviceTitle}</h3>
              <p>Pet Name: {booking.petName}</p>
              <p>Start Date: {booking.startDate}</p>
              <p>End Date: {booking.endDate}</p>
              <p>Status: {booking.status}</p>

              {/* Условие для отображения кнопки отмены */}
              {booking.status !== 'cancelled' && canCancelBooking(booking.startDate) && (
                <button
                  className="mt-2 p-2 bg-red-500 text-white rounded"
                  onClick={() => changeStatus(booking.id, 'cancelled', booking)}
                >
                  Cancel Booking
                </button>
              )}

              {/* Условие для отображения кнопки отзыва */}
              {isReviewAvailable(booking.endDate) && booking.status !== 'cancelled' && (
                <button
                  className="mt-2 p-2 green-button"
                  onClick={() => alert('Leave a review')}
                >
                  Leave a Review
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {notification && (
        <div className="mt-4 p-4 border bg-green-100 text-green-800 rounded">
          {notification}
        </div>
      )}
    </div>
  );
};

export default MyPetBookings;
