import React, { useState, useEffect } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface ServicePage {
  content: Service[];
  totalPages: number;
  totalElements: number;
  number: number; // текущая страница
  size: number; // размер страницы
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize] = useState<number>(10); // Размер страницы фиксирован!!!
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  const fetchServices = async (page: number) => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`/api/admin/services?page=${page}&size=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data: ServicePage = await response.json();
      setServices(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      alert("Error fetching services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin: Services</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="border border-gray-300 p-2">{service.id}</td>
                  <td className="border border-gray-300 p-2">{service.title}</td>
                  <td className="border border-gray-300 p-2">{service.description}</td>
                  <td className="border border-gray-300 p-2">{service.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded ${currentPage === 0 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Previous
            </button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={`px-4 py-2 rounded ${currentPage === totalPages - 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Services;
