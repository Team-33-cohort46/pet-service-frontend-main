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

const Bookings: React.FC = () => {
  const [ownerBookings, setOwnerBookings] = useState<Booking[]>([]);
  const [sitterBookings, setSitterBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<string>('owner');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null); // Для отображения уведомлений

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const ownerResponse = await fetch('/api/bookings/as-owner', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const sitterResponse = await fetch('/api/bookings/as-sitter', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (ownerResponse.ok && sitterResponse.ok) {
          const ownerData = await ownerResponse.json();
          const sitterData = await sitterResponse.json();
          setOwnerBookings(ownerData);
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
        if (isOwner) {
          setOwnerBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.id === bookingId ? { ...booking, status: newStatus } : booking
            )
          );
        } else {
          setSitterBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.id === bookingId ? { ...booking, status: newStatus } : booking
            )
          );
        }

        // Уведомление об изменении статуса
        const participantName = isOwner ? booking.sitterName : booking.ownerName;
        setNotification(`The booking status has been changed to "${newStatus}" and the notification has been sent to ${participantName}.`);
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
      <h1 className="text-4xl font-bold mb-6">Your Bookings</h1>
      <div className="mb-6">
        <button
          className={`mr-4 p-2 rounded ${activeTab === 'owner' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('owner')}
        >
          As Owner
        </button>
        <button
          className={`p-2 rounded ${activeTab === 'sitter' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('sitter')}
        >
          As Sitter
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : activeTab === 'owner' ? (
        <BookingsList bookings={ownerBookings} isOwner={true} changeStatus={changeStatus} />
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

export default Bookings;
