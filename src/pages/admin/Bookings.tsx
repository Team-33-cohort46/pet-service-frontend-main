import React, { useState, useEffect } from "react";

interface Booking {
  id: number;
  status: string;
  service: {
    id: number;
    name: string;
    description: string;
  };
  pet: {
    id: number;
    name: string;
    type: string;
  };
  startDate: string; // ISO string format
  endDate: string; // ISO string format
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("/api/bookings") // Replace with your backend API for fetching bookings
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Service</th>
            <th className="border border-gray-300 p-2">Pet</th>
            <th className="border border-gray-300 p-2">Start Date</th>
            <th className="border border-gray-300 p-2">End Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border border-gray-300 p-2">
                {booking.service.name}
                <br />
                <span className="text-gray-500 text-sm">
                  {booking.service.description}
                </span>
              </td>
              <td className="border border-gray-300 p-2">
                {booking.pet.name} ({booking.pet.type})
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(booking.startDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(booking.endDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`px-2 py-1 rounded ${
                    booking.status === "pending"
                      ? "bg-yellow-200"
                      : booking.status === "confirmed"
                      ? "bg-green-200"
                      : "bg-red-200"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white p-2 rounded mr-2">
                  Confirm
                </button>
                <button className="bg-red-500 text-white p-2 rounded">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
