import React, { useEffect, useState } from "react";

interface Service {
  id: string;
  title: string;
  price: number;
  description: string;
}

const UserProfilePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения списка услуг
  const fetchUserServices = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await fetch("/api/services/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();
      setServices(data);
    } catch (err: any) {
      console.error("Error fetching services:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  // Функция для добавления новой услуги
  const addService = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newService.title,
          price: parseFloat(newService.price),
          description: newService.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add service");
      }

      const addedService = await response.json();
      setServices((prevServices) => [...prevServices, addedService]);
      setNewService({ title: "", price: "", description: "" });
    } catch (err: any) {
      console.error("Error adding service:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  // Функция для редактирования существующей услуги
  const editService = async () => {
    if (!editingService) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await fetch(`/api/services/${editingService.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingService.title,
          price: editingService.price,
          description: editingService.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      const updatedService = await response.json();
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === updatedService.id ? updatedService : service
        )
      );
      setEditingService(null); // Завершаем режим редактирования
    } catch (err: any) {
      console.error("Error updating service:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  // Функция для начала редактирования услуги
  const startEditing = (service: Service) => {
    setEditingService({ ...service });
  };

  useEffect(() => {
    fetchUserServices();
  }, []);

  return (
    <div className="user-profile w-full p-8">
      <h1 className="text-2xl font-bold text-center mb-4">My Services</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Список услуг */}
      {services.length > 0 ? (
        <ul>
          {services.map((service) => (
            <li key={service.id} className="p-4 mb-2 border rounded">
              <h3 className="font-semibold">{service.title}</h3>
              <p>
                <strong>Price:</strong> ${service.price}
              </p>
              <p>
                <strong>Description:</strong> {service.description}
              </p>
              <button
                onClick={() => startEditing(service)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No services found.</p>
      )}

      {/* Форма для добавления новой услуги */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingService ? "Edit Service" : "Add New Service"}
        </h2>
        <div className="mb-4">
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            value={editingService ? editingService.title : newService.title}
            onChange={(e) =>
              editingService
                ? setEditingService({
                    ...editingService,
                    title: e.target.value,
                  })
                : setNewService({ ...newService, title: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            placeholder="Enter service title"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            value={editingService ? editingService.price : newService.price}
            onChange={(e) =>
              editingService
                ? setEditingService({
                    ...editingService,
                    price: parseFloat(e.target.value) || 0,
                  })
                : setNewService({ ...newService, price: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Description</label>
          <textarea
            value={
              editingService
                ? editingService.description
                : newService.description
            }
            onChange={(e) =>
              editingService
                ? setEditingService({
                    ...editingService,
                    description: e.target.value,
                  })
                : setNewService({ ...newService, description: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            placeholder="Enter description"
          />
        </div>
        <button
          onClick={editingService ? editService : addService}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {editingService ? "Save Changes" : "Add Service"}
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
