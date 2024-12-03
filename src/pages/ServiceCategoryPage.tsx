import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  user: {
    firstName: string;
    photo?: string; // Фото может отсутствовать
    averageStars: number; // Рейтинг от 1 до 5
    reviewsCount: number;
  };
}

const defaultAvatar = '../assets/images/profile-logo.png';

const ServicesByCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryName, setCategoryName] = useState<string>(''); // Название категории
  const [currentPage, setCurrentPage] = useState<number>(0); // Текущая страница
  const [totalPages, setTotalPages] = useState<number>(0); // Всего страниц
  const itemsPerPage = 10; // Количество элементов на странице

  useEffect(() => {
    if (categoryId) {
      fetchServicesByCategory(Number(categoryId), currentPage);
      fetchCategoryName(Number(categoryId));
    }
  }, [categoryId, currentPage]);

  const fetchServicesByCategory = async (categoryId: number, page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/services?categoryId=${categoryId}&page=${page}&size=${itemsPerPage}`
      );
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data.content); // Контент из ответа
      setTotalPages(data.totalPages); // Общее количество страниц
    } catch (error) {
      console.error(error);
      alert('Error fetching services.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryName = async (categoryId: number) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`);
      if (!response.ok) throw new Error('Failed to fetch category name');
      const data = await response.json();
      setCategoryName(data.name || 'Services');
    } catch (error) {
      console.error(error);
      setCategoryName('Services');
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {categoryName}
      </h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-4 rounded-lg shadow-md flex"
              >
                {/* Левая часть карточки */}
                <div className="w-1/4 flex flex-col items-center">
                  <img
                    src={service.user.photo || defaultAvatar} // Если фото нет, отображаем стандартное
                    alt={service.user.firstName}
                    className="w-30 h-30 rounded-lg object-cover" // Квадратное фото
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mt-2 text-center">
                    {service.user.firstName}
                  </h3>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <span className="mr-1">★ {service.user.averageStars.toFixed(1)}</span>
                    <Link
                      to={`/reviews/${service.user.firstName}`}
                      className="text-blue-500 underline"
                    >
                      ({service.user.reviewsCount} reviews)
                    </Link>
                  </div>
                </div>
                {/* Правая часть карточки */}
                <div className="w-3/4 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                  <p className="text-lg font-bold text-gray-800 mt-2">
                    от €{service.price} в день
                  </p>
                  <Link
                    to={`/booking/${service.id}`}
                    state={{ service }}
                    className="bg-[rgb(48,183,213)] text-white px-4 py-2 rounded-lg shadow hover:bg-[rgb(99,196,218)] transition mt-4 inline-block"
                  >
                    Забронировать
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Пагинация */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-lg shadow ${
                currentPage === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Назад
            </button>
            <span className="text-gray-700">
              Страница {currentPage + 1} из {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className={`px-4 py-2 rounded-lg shadow ${
                currentPage === totalPages - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Вперед
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesByCategory;