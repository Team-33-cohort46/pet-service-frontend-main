import React from 'react';

interface Booking {
  id: number;
  status: string;
  serviceTitle: string;
  petName: string;
  price: number;
  startDate: string;
  endDate: string;
}

interface BookingStatusControlsProps {
  booking: Booking;
  isOwner: boolean;
  changeStatus: (bookingId: number, newStatus: string, isOwner: boolean) => void;
}

const BookingStatusControls: React.FC<BookingStatusControlsProps> = ({ booking, isOwner, changeStatus }) => {
  return (
    <div className="mt-4 flex space-x-2">
      {isOwner ? (
        // Владелец может только отменить бронь, если она не отменена или подтверждена
        (booking.status !== 'cancelled' && booking.status !== 'confirmed' && booking.status !== 'rejected') && (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
            onClick={() => changeStatus(booking.id, 'cancelled', true)}
          >
            Cancel
          </button>
        )
      ) : (
        // Ситтер может подтвердить или отклонить, если статус "pending"
        booking.status === 'pending' && (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => changeStatus(booking.id, 'confirmed', false)}
            >
              Confirm
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              onClick={() => changeStatus(booking.id, 'rejected', false)}
            >
              Reject
            </button>
          </>
        )
      )}
    </div>
  );
};

export default BookingStatusControls;
