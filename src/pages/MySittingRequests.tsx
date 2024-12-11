import React, { useEffect, useState } from 'react';
import BookingsList from './BookingsList';

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

  const changeStatus = async (bookingId: number, newStatus: string, isOwner: boolean, booking: Booking) => {
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

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">My Sitting Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <BookingsList bookings={sitterBookings} isOwner={false} changeStatus={changeStatus} />
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
