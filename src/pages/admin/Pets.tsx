import React, { useState, useEffect } from "react";

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

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetch("/api/pets") // Replace with your backend API for fetching pets
      .then((response) => response.json())
      .then((data) => setPets(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pets</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Photo</th>
            <th className="border border-gray-300 p-2">Owner</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td className="border border-gray-300 p-2">{pet.name}</td>
              <td className="border border-gray-300 p-2">{pet.type}</td>
              <td className="border border-gray-300 p-2">
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="w-12 h-12 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                {pet.owner.firstName} {pet.owner.lastName} <br />
                <span className="text-gray-500 text-sm">{pet.owner.email}</span>
              </td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white p-2 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white p-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pets;
