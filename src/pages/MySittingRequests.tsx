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

const MySittingRequests: React.FC = () => {
  const [sitterBookings, setSitterBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bookings/as-sitter', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const sitterData = await response.json();
          setSitterBookings(sitterData);
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

  const changeStatus = async (bookingId: number, newStatus: string) => {
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
        setSitterBookings((prevBookings) =>
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

  const renderStatusControls = (booking: Booking) => {
    // Показываем кнопки только для состояния "pending"
    if (booking.status !== 'pending') {
      return null;
    }

    const handleConfirm = () => {
      if (booking.status !== 'confirmed' && booking.status !== 'rejected') {
        changeStatus(booking.id, 'confirmed');
      }
    };

    const handleReject = () => {
      if (booking.status !== 'confirmed' && booking.status !== 'rejected') {
        changeStatus(booking.id, 'rejected');
      }
    };

    return (
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleConfirm}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Confirm
        </button>
        <button
          onClick={handleReject}
          className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Reject
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">My Sitting Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          {sitterBookings.map((booking) => (
            <div
              key={booking.id}
              className={`p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-all ${
                booking.status === 'cancelled' ? 'opacity-50 bg-gray-200' : ''
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {booking.serviceTitle}
                  </h3>
                  <p className="text-sm text-gray-600">Pet: {booking.petName}</p>
                  <p className="text-sm text-gray-600">
                    Price: <span>€{booking.price}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.startDate} - {booking.endDate}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Status:</strong> {booking.status}
                  </p>
                </div>
              </div>
              {/* Кнопки в нижней части карточки для статуса "pending" */}
              {renderStatusControls(booking)}
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

export default MySittingRequests;
