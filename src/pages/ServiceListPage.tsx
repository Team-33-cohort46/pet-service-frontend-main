// src/pages/ServiceListPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockServices } from '../services/mockData';

// Interface for service data
interface Service {
  id: number;
  name: string;
  description: string;
  category: string; // Предполагается, что у услуги есть поле категории
}

const ServiceListPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, [categoryName]);

  const fetchServices = async () => {
    try {
      const allServices = mockServices;
      const servicesByCategory = allServices.filter(
        (service: Service) => service.category.toLowerCase() === categoryName?.toLowerCase()
      );
      setServices(servicesByCategory);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleBooking = (serviceId: number) => {
    navigate(`/booking/${categoryName}/${serviceId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-700 mb-4">{service.description}</p>
            <button
              onClick={() => handleBooking(service.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListPage;
