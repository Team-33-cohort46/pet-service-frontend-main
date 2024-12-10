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

const BookingStatusControls: React.FC<BookingStatusControlsProps> = ({ booking, isOwner, changeStatus }) => {
  const handleChangeStatus = (newStatus: string) => {
    changeStatus(booking.id, newStatus, isOwner, booking);
  };

  return (
    <div className="flex items-center space-x-4">
      {booking.status === 'pending' && (
        <>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => handleChangeStatus('confirmed')}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={() => handleChangeStatus('rejected')}
          >
            Reject
          </button>
        </>
      )}
    </div>
  );
};

export default BookingStatusControls;
