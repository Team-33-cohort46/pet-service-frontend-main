import React, { useEffect, useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  serviceCategory: string;
}

const UserProfilePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: "",
    serviceCategory: "",
  });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Получение списка услуг
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

  // Добавление новой услуги
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
          description: newService.description,
          price: parseFloat(newService.price),
          serviceCategory: parseFloat(newService.serviceCategory),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add service");
      }

      const addedService = await response.json();
      setServices((prevServices) => [...prevServices, addedService]);
      setNewService({ title: "", description: "", price: "", serviceCategory: "" });
    } catch (err: any) {
      console.error("Error adding service:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  // Сохранение изменений услуги
  const saveService = async (updatedService: Service) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await fetch(`/api/services/${updatedService.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      });

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      const savedService = await response.json();
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === savedService.id ? savedService : service
        )
      );
      setEditingServiceId(null); // Завершаем редактирование
    } catch (err: any) {
      console.error("Error updating service:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  // Начать редактирование услуги
  const startEditing = (id: string) => {
    setEditingServiceId(id);
  };

  // Обработчик изменения полей редактируемой услуги
  const handleServiceChange = (id: string, field: keyof Service, value: string | number) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
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
          {services.map((service) =>
            editingServiceId === service.id ? (
              <li key={service.id} className="p-4 mb-4 border rounded">
                <div className="mb-2">
                  <label className="font-semibold">Title:</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) =>
                      handleServiceChange(service.id, "title", e.target.value)
                    }
                    className="w-full px-2 py-1"
                  />
                </div>
                <div className="mb-2">
                  <label className="font-semibold">Price:</label>
                  <input
                    type="number"
                    value={service.price}
                    onChange={(e) =>
                      handleServiceChange(service.id, "price", parseFloat(e.target.value) || 0)
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="mb-2">
                  <label className="font-semibold">Description:</label>
                  <textarea
                    value={service.description}
                    onChange={(e) =>
                      handleServiceChange(service.id, "description", e.target.value)
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <button
                  onClick={() => saveService(service)}
                  className="bg-green-600 hover:bg-green-700  text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingServiceId(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </li>
            ) : (
              <li key={service.id} className="p-4 mb-4 ">
                <h3 className="font-semibold text-sky-500">{service.title}</h3>
                <p>
                  <strong>Price:</strong> {service.price} €
                </p>
                <p>
                  <strong>Description:</strong> {service.description}
                </p>
                {/* <p>
                  <strong>Category:</strong> {service.serviceCategory}
                </p> */}
                <button
                  onClick={() => startEditing(service.id)}
                  className="bg-sky-400 hover:bg-sky-500 hover:text-white text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              </li>
            )
          )}
        </ul>
      ) : (
        <p>No services found.</p>
      )}

      {/* Форма добавления новой услуги */}
      <div className="mt-6">
      <details>
            <summary className=" flex  select-none text-center ">
              <span className="   mt-6 w-full bg-sky-400 hover:bg-sky-500 hover:text-white text-white  py-2 px-2 rounded" >Add a New Service</span>
              </summary>
        <div className="mb-4 mt-4">
          <label className="font-semibold">Title</label>
          <input
            type="text"
            value={newService.title}
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
            className="w-full border rounded px-2 py-1"
            placeholder="Dog sitter"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Price $</label>
          <input
            type="text"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
            className="w-full border rounded px-2 py-1"
            placeholder="15"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Description</label>
          <textarea
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
            className="w-full border rounded px-2 py-1"
            placeholder="About your service"
          />
        </div>
        <div className="mb-4">


        <label className="font-semibold">Category</label>
        <select
                    name="type"
                    value={newService.serviceCategory}
            onChange={(e) =>
              setNewService({ ...newService, serviceCategory: e.target.value })
            }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="1">Cat</option>
                    <option value="2">Dog</option>
                    <option value="3">Bird</option>
                    <option value="4">Rodent</option>
                  </select>
        </div>
        <button
          onClick={addService}
          className="w-full bg-sky-400 hover:bg-sky-500 text-white  py-2 px-4 rounded"
        >
          Add Service
        </button>
        </details>
      </div>

      
    </div>
  );
};

export default UserProfilePage;
