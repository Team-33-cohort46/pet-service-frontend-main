import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Booking {
  bookingId: number;
  status: string;
  serviceId: number;
  petId: number;
  sitterId: number;
  ownerId: number;
  startDate: string;
  endDate: string;
}

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) fetchBookingDetails(Number(id));
  }, [id]);

  const fetchBookingDetails = async (bookingId: number) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch booking details');
      }

      const data = await response.json();
      console.log(data);
      setBooking(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching booking details.');
      navigate('/'); // Перенаправить на главную в случае ошибки
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!id) return;

    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      const updatedBooking = await response.json();
      setBooking(updatedBooking); // Обновить статус бронирования
      alert('Booking successfully cancelled.');
    } catch (error) {
      console.error(error);
      alert('Error cancelling booking.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!booking) {
    return <div>Booking not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <p><strong>Booking ID:</strong> {booking.bookingId}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Service ID:</strong> {booking.serviceId}</p>
        <p><strong>Pet ID:</strong> {booking.petId}</p>
        <p><strong>Start Date:</strong> {booking.startDate}</p>
        <p><strong>End Date:</strong> {booking.endDate}</p>
      </div>
      <p className="mt-4">
        You can view more details and manage your bookings in your{' '}
        <a href="/profile" className="text-blue-500">personal account</a>.
      </p>
      {booking.status !== 'cancelled' && (
        <button
          onClick={handleCancelBooking}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
};

export default BookingDetailsPage;
