import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import profilePhoto from '../asets/images/user.png'
import star from '../asets/images/star.png'
import emptyStar from '../asets/images/empty-star.png'
import halfstar from '../asets/images/half-star.png'
const DEFAULT_PHOTO = profilePhoto;

interface Service {
  user: any;
  photo:any;
  id: number;
  firstName: string;
  title: string;
  description: string;
  price: number;
}

const renderStars = (rating: number) => {
  const filledStars = Math.floor(rating); 
  const halfStar = rating % 1 >= 0.5; 
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0); 

  return (
    <div className='flex'>
      {Array.from({ length: filledStars }).map((_, index) => (
        <img
          key={`filled-${index}`}
          src={`${star}`}
          alt="Filled Star"
          style={{ width: "20px", height: "20px", margin: "0 2px" }}
        />
      ))}
      {halfStar && (
        <img
          src={`${halfstar}`}
          alt="Half Star"
          style={{ width: "20px", height: "20px", margin: "0 2px" }}
        />
      )}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <img
          key={`empty-${index}`}
          src={`${emptyStar}`}
          alt="Empty Star"
          style={{ width: "20px", height: "20px", margin: "0 2px" }}
        />
      ))}
    </div>
  );
};

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
              
              <p className="w-100 h-10 flex mt-2 mb-2"><img src={service.user.photo || DEFAULT_PHOTO} alt="" className=" rounded-full" /><span className=" flex pt-2 ml-3">{service.user.firstName} {service.user.lastName}</span></p>
              <p>{service.description}</p>
              <p className="font-bold mt-2"> {service.price} €</p>
              <p className="flex space-x-2 mb-4"><strong>Rating:</strong> {renderStars(service.user.averageStars)}</p>
              <Link
                  to={`/reviews/${service.user.email}`}
                  className="text-sm text-blue-600 hover:underline"
              >
                View Reviews
              </Link>

              <Link
                to={`/booking/${service.id}`}
                state={{ service }}
                className=" bg-sky-400 hover:bg-sky-500 text-white  py-2 px-4 rounded"
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
