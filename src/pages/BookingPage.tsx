import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockServices, mockBookings } from '../services/mockData';

const BookingPage: React.FC = () => {
  const { category, serviceId } = useParams<{ category: string; serviceId: string }>();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const service = mockServices.find((s) => s.id === Number(serviceId));

  if (!service) {
    return <h1 className="text-center text-xl mt-10">Service not found</h1>;
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time.');
      return;
    }

    const existingBooking = mockBookings.find(
      (booking) =>
        booking.serviceId === Number(serviceId) &&
        booking.date === selectedDate &&
        booking.timeSlot === selectedTime
    );

    if (existingBooking) {
      alert('This time slot is already booked.');
      return;
    }

    mockBookings.push({
      serviceId: Number(serviceId),
      date: selectedDate,
      timeSlot: selectedTime,
    });

    alert('Booking successful!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Booking {service.name} in {category}
      </h1>
      <p>{service.description}</p>
      <div className="mb-4">
        <label>Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label>Time:</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Select a time slot</option>
          <option value="10:00-11:00">10:00-11:00</option>
          <option value="11:00-12:00">11:00-12:00</option>
        </select>
      </div>
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
