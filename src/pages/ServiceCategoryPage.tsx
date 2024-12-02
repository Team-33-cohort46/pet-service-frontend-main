//feature/new-booking-feature
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ServiceCategory {
  id: number;
  title: string;
  services: string[];
}

// Моковые данные с корректными услугами для каждой категории
const mockServiceCategories: ServiceCategory[] = [
  {
    id: 1,
    title: 'Cats',
    services: ['Grooming', 'Overnight Boarding', 'Veterinary Visits', 'In-Home Visits'],
  },
  {
    id: 2,
    title: 'Dogs',
    services: ['Walking', 'Home Boarding', 'In-Home Visits', 'Veterinary Visits', 'Grooming'],
  },
  {
    id: 3,
    title: 'Birds',
    services: ['Cage Cleaning', 'Dietary Consultation', 'Veterinary Visits'],
  },
  {
    id: 4,
    title: 'Rodents',
    services: ['Cage Cleaning', 'Dietary Consultation', 'Veterinary Visits'],
  },
];

const ServiceCategoryPage: React.FC = () => {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    // Используем моковые данные
    fetchServiceCategories();
  }, []);

  function fetchServiceCategories() {
    // Вместо API используем заглушки
    setServiceCategories(mockServiceCategories);
  }

  return (
    <div>
      {/* <ul>
        {serviceCategories.map((category) => (
          <li key={category.id}>
            <p>{category.title}</p>
            <ul>
              {category.services.map((service, index) => (
                <li key={index} className="text-gray-600">
                  {service}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul> */}

      <h1 className="text-[18px] font-bold text-center mb-6 mt-8">Service Categories</h1>
      <div className="grid grid-cols-4 gap-4 mb-10">
        <Link to="/services/cats" className="col-start-2">
          <div className="bg-stone-50 p-3 rounded shadow-md hover:shadow-lg cursor-pointer grid place-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7577/7577239.png"
              alt="Icon cats"
              className="w-10 pb-2"
            />
            <b>Cats</b>
          </div>
        </Link>
        <Link to="/services/dogs">
          <div className="bg-stone-50 p-3 rounded shadow-md hover:shadow-lg cursor-pointer grid place-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/91/91536.png"
              alt="Icon dogs"
              className="w-10 pb-2"
            />
            <b>Dogs</b>
          </div>
        </Link>
        <Link to="/services/birds" className="col-start-2">
          <div className="bg-stone-50 p-3 rounded shadow-md hover:shadow-lg cursor-pointer grid place-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8531/8531872.png"
              alt="Icon birds"
              className="w-10 pb-2"
            />
            <b>Birds</b>
          </div>
        </Link>
        <Link to="/services/rodents">
          <div className="bg-stone-50 p-3 rounded shadow-md hover:shadow-lg cursor-pointer grid place-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/84/84419.png"
              alt="Icon rodents"
              className="w-10 pb-2"
            />
            <b>Rodents</b>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCategoryPage;
