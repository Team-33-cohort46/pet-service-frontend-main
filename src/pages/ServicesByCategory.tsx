import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
}

const ServicesByCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (categoryId) {
      fetchServicesByCategory(Number(categoryId));
    }
  }, [categoryId]);

  const fetchServicesByCategory = async (categoryId: number) => {
    try {
      const response = await fetch(`/api/services?categoryId=${categoryId}`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data.content); // Adjust this based on the response structure
    } catch (error) {
      console.error(error);
      alert('Error fetching services.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Services in Category</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p>{service.description}</p>
              <p className="font-bold">{service.price}</p>
              <Link
                to={`/booking/${service.id}`}
                state={{ service }}
                className="text-blue-500 mt-2 inline-block"
              >
                Book this service
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesByCategory; 
