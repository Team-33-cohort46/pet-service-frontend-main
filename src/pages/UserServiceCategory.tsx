import React, { useEffect, useState } from 'react';

interface Service {
  id: string;
  title: string;
  price: number;
  description: string;
}

const UserProfilePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUserServices = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('User is not authenticated.');
        return;
      }

      const response = await fetch('api/services/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }

      const data = await response.json();
      setServices(data); // Предполагается, что API возвращает массив
    } catch (err: any) {
      console.error('Error fetching services:', err);
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    fetchUserServices();
  }, []);

  return (
    <div className="user-profile">
      <h1 className="text-2xl font-bold">My Services</h1>
      {error && <p className="text-red-500">{error}</p>}
      {services.length > 0 ? (
        <ul>
          {services.map((service) => (
            <li key={service.id} className="border rounded p-4 mb-2">
              <h3 className="font-semibold">{service.title}</h3>
              <p><strong>Price:</strong> ${service.price}</p>
              <p><strong>Description:</strong> {service.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No services found.</p>
      )}
    </div>
  );
};

export default UserProfilePage;
