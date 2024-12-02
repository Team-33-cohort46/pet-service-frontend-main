import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

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
  // const { serviceId } = useParams<{ serviceId: string }>();
  // const [service, setService] = useState<Service | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  const service = state?.service as Service;

  useEffect(() => {
    if (!service) {
      // Если данных нет, возвращаем пользователя назад
      alert('Service not found');
      navigate(-1);
      return;
    }

    getUserAndFetchPets();
  }, [service]);

  const getUserAndFetchPets = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        fetchPets();
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/login');
    }
  };

  const fetchPets = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/pets/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch pets');
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching pets.');
    }
  };

  const handleBooking = async () => {
    if (!selectedPet || !startDate || !endDate) {
      alert('Please fill all fields');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
         },
        body: JSON.stringify({
          serviceId: service.id,
          petId: selectedPet,
          startDate: startDate,
          endDate: endDate,
        }),
      });

      if (!response.ok) throw new Error('Failed to create booking');
      const data = await response.json();
      alert('Booking successful!');
      navigate(`/bookings/${data.id}`);
    } catch (error) {
      console.error(error);
      alert('Error making booking.');
    }
  };

  return (
    <div className="p-4">
      {service ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
          <p>{service.description}</p>
          <p className="font-bold">{service.price}</p>
          <form className="mt-4">
            <label className="block">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 mb-2"
            />
            <label className="block">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 mb-2"
            />
            <label className="block">Choose your pet:</label>
            <select
              value={selectedPet || ''}
              onChange={(e) => setSelectedPet(Number(e.target.value))}
              className="border p-2 mb-4"
            >
              <option value="">Select pet</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleBooking}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Book this service
            </button>
          </form>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BookingDetails;