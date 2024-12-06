import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface Pet {
  id: number;
  name: string;
}

const BookingDetails: React.FC = () => {
  const { state } = useLocation();
  const [pets, setPets] = useState<Pet[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const service = state?.service as Service;

  const getUserAndFetchPets = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchPets(); // Загружаем питомцев после получения данных пользователя
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/login');
    }
  }, [navigate]);

  const fetchPets = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/pets/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch pets');
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error(error);
      setMessage('Error fetching pets.');
    }
  };

  const handleBooking = async () => {
    if (!selectedPet || !startDate || !endDate) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: service.id,
          petId: selectedPet,
          startDate,
          endDate,
        }),
      });

      if (!response.ok) throw new Error('Failed to create booking');
      const data = await response.json();
      setMessage('Booking successful! Redirecting...');
      setTimeout(() => navigate(`/bookings/${data.id}`), 3000);
    } catch (error) {
      console.error(error);
      setMessage('Error making booking.');
    }
  };

  useEffect(() => {
    if (!service) {
      setMessage('Service not found');
      setTimeout(() => navigate(-1), 3000);  // Переход на предыдущую страницу через 3 секунды
      return;
    }
    getUserAndFetchPets();
  }, [service, getUserAndFetchPets, navigate]); // Добавили navigate в список зависимостей

  return (
    <div className="max-w-3xl mx-auto p-8 mt-8 bg-gray-50 shadow-md rounded-lg">
      {service ? (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Book a Service
          </h1>
          <section className="mb-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Service Details</h2>
            <p className="text-gray-600 text-lg">{service.description}</p>
            <p className="text-gray-700 font-semibold text-xl mt-2">
              Price: {service.price.toFixed(0)}€ a day
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Booking Information</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Select Start Date:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Select End Date:
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Choose Your Pet:
                </label>
                <select
                  value={selectedPet || ''}
                  onChange={(e) => setSelectedPet(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select pet</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Select the pet for whom you are booking this service.
                </p>
              </div>
              <button
                type="button"
                onClick={handleBooking}
                className="w-full bg-[rgb(48,183,213)] text-white font-medium py-3 rounded-lg shadow-md hover:bg-[rgb(99,196,218)] transition"
              >
                Confirm Booking
              </button>
            </form>
          </section>

          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes('Error') ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {message}
            </p>
          )}
          <p className="text-sm text-gray-500 text-center mt-6">
            Make sure all details are correct before confirming your booking.
          </p>
        </>
      ) : (
        <div className="text-gray-600 text-center">Loading...</div>
      )}
    </div>
  );
};

export default BookingDetails;
