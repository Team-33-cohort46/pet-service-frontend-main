import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

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

  // Оборачиваем функцию в useCallback, чтобы избежать лишних рендеров
  const fetchBookingDetails = useCallback(async (bookingId: number) => {
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
      setBooking(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching booking details.');
      navigate('/'); // Redirect to the homepage on error
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (id) fetchBookingDetails(Number(id));
  }, [id, fetchBookingDetails]); // Добавляем fetchBookingDetails в список зависимостей

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
      setBooking(updatedBooking); // Update booking status
      alert('Booking successfully cancelled.');
    } catch (error) {
      console.error(error);
      alert('Error cancelling booking.');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 mt-6">Loading...</div>;
  }

  if (!booking) {
    return <div className="text-center text-red-500 mt-6">Booking not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Booking Details
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overview</h2>
        <div className="border rounded-lg p-4 bg-white shadow-sm space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Booking ID:</span> {booking.bookingId}
          </p>
          <p className="text-gray-700 flex items-center">
            <span className="font-medium">Status:</span>
            <span
              className={`ml-2 px-3 py-1 text-sm font-semibold rounded ${
                booking.status === 'cancelled'
                  ? 'bg-red-500 text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {booking.status}
            </span>
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Details</h2>
        <div className="border rounded-lg p-4 bg-white shadow-sm space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Service ID:</span> {booking.serviceId}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Pet ID:</span> {booking.petId}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Start Date:</span> {new Date(booking.startDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">End Date:</span> {new Date(booking.endDate).toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Additional Information</h2>
        <p className="text-gray-600 text-sm">
          Manage this booking and view more details in your{' '}
          <Link to="/user" className="text-blue-500 hover:underline">
          personal account
                    </Link>.
        </p>
      </section>

      {booking.status !== 'cancelled' && (
        <button
          onClick={handleCancelBooking}
          className="w-full bg-red-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
};

export default BookingDetailsPage;
