// BookingsList.tsx
import React from 'react';

import BookingStatusControls from './BookingStatusControls';
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
interface BookingsListProps {
  bookings: Booking[];
  isOwner: boolean;
  changeStatus: (bookingId: number, newStatus: string, isOwner: boolean, booking: Booking) => void;
}

const BookingsList: React.FC<BookingsListProps> = ({ bookings, isOwner, changeStatus }) => {
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div key={booking.id} className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-all">
          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">{booking.serviceTitle}</h3>
              <p className="text-sm text-gray-600">Pet: {booking.petName}</p>
              <p className="text-sm text-gray-600">Price: ${booking.price}</p>
              <p className="text-sm text-gray-600">
                {booking.startDate} - {booking.endDate}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Status:</strong> {booking.status}
              </p>
            </div>
            <BookingStatusControls
              booking={booking}
              isOwner={isOwner}
              changeStatus={changeStatus}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;
