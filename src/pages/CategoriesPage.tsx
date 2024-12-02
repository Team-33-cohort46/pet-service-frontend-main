import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  title: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      alert('Error fetching categories.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Service Categories</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <Link
                to={`/services/${category.id}`}
                className="text-blue-500 mt-2 inline-block"
              >
                View services
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
