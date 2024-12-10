// BookingStatusControls.tsx
import React from 'react';

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

interface BookingStatusControlsProps {
  booking: Booking;
  isOwner: boolean;
  changeStatus: (bookingId: number, newStatus: string, isOwner: boolean, booking: Booking) => void;
}

const BookingStatusControls: React.FC<BookingStatusControlsProps> = ({
  booking,
  isOwner,
  changeStatus,
}) => {
  const handleCancel = () => {
    if (isOwner && booking.status !== 'cancelled' && booking.status !== 'confirmed' && booking.status !== 'rejected') {
      changeStatus(booking.id, 'cancelled', true, booking);
    }
  };

  const handleConfirm = () => {
    if (!isOwner && booking.status !== 'confirmed' && booking.status !== 'rejected') {
      changeStatus(booking.id, 'confirmed', false, booking);
    }
  };

  const handleReject = () => {
    if (!isOwner && booking.status !== 'confirmed' && booking.status !== 'rejected') {
      changeStatus(booking.id, 'rejected', false, booking);
    }
  };

  if (booking.status === 'confirmed' || booking.status === 'rejected') {
    return null; // No buttons if the status is "Confirmed" or "Rejected"
  }

  return (
    <div className="flex space-x-4">
      {isOwner ? (
        <button
          onClick={handleCancel}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default BookingStatusControls;
