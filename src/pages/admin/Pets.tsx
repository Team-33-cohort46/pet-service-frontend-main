import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Pet {
  id: number;
  name: string;
  type: string;
  photo: string;
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}
const defaultAvatar = "../assets/images/profile-logo.png";

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch("/api/admin/pets?page=0&size=10", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          setError("Unauthorized. Please log in again.");
          localStorage.removeItem("authToken");
          navigate("/login");
          return;
        }

        if (response.status === 403) {
          setError("You do not have permission to access this page.");
          navigate("/forbidden");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setPets(data.content || []);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [navigate]);

  const handleEditPet = (userId: number) => {
    navigate(`/admin/users/edit/${userId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mt-8 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Users</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="flex bg-white border rounded-lg shadow-md p-6 items-center hover:bg-gray-100 transition"
            >
              {/* Левая часть: фото */}
              <div className="w-1/5 flex justify-center">
                <img
                  src={pet.photo || defaultAvatar}
                  alt={`${pet.name}`}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              {/* Правая часть: информация о пользователе */}
              <div className="w-4/5 pl-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {pet.name}
                </h2>
                <p className="text-gray-600 mt-2">{pet.type}</p>
{/*
                <div className="mt-4 flex">
                  <button
                    onClick={() => handleEditPet(pet.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                </div>*/}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Pets;
