import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  title: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);  // Для отображения сообщений

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/services_categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      setMessage('Error fetching categories.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-8 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
      Now tell us a bit about your pets...
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Verified and reviewed sitters are waiting to apply!
      </h2>
      {message && (
        <p className="mt-4 text-center text-red-500">
          {message}
        </p>
      )}
      {loading ? (
        <div className="text-gray-600 text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <Link
              to={`/services/${category.id}`}
              key={category.id}
              className="w-full bg-white border p-4 rounded-lg shadow-md hover:bg-gray-100 transition transform hover:scale-105 flex items-center justify-center min-h-[100px]"
            >
              <h3 className="text-2xl font-semibold text-gray-700 text-center">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;