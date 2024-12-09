import React, { useState, useEffect } from "react";

interface UserResponseDto {
  id: number;
  firstName: string;
  lastName: string;
}

interface Booking {
  id: number;
  status: string;
  serviceTitle: string;
  petName: string;
  sitter: UserResponseDto;
  owner: UserResponseDto;
  price: number;
  startDate: string;
  endDate: string;
}

const BookingsAsOwner: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authentication required. Please log in.");
        return;
      }

      try {
        const response = await fetch("/api/bookings/as-owner", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.status}`);
        }

        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchBookings();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!bookings.length) {
    return <div className="text-center mt-4">No bookings found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 sm:h-14 sm:min-w-full">I booked services</h1>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="border p-4 mb-4 rounded text-sm"
        >
          <p>
            <strong>Booking ID:</strong> {booking.id}
          </p>
          <p>
            <strong>Status:</strong> {booking.status}
          </p>
          <p>
            <strong>Service Title:</strong> {booking.serviceTitle}
          </p>
          <p>
            <strong>Pet Name:</strong> {booking.petName}
          </p>
          <p>
            <strong>Sitter:</strong> {`${booking.sitter.firstName} ${booking.sitter.lastName}`}
          </p>
          <p>
            <strong>Owner:</strong> {`${booking.owner.firstName} ${booking.owner.lastName}`}
          </p>
          <p>
            <strong>Price:</strong> {booking.price.toFixed(2)} €
          </p>
          <p>
            <strong>Start Date:</strong> {booking.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {booking.endDate}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookingsAsOwner;
