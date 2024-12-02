import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const PetPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [editableUser, setEditableUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsLoggedOut } = useContext(AuthContext);



  const [newPet, setNewPet] = useState({ name: "", type: "", photo: "" });

  const handleAddPet = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch("api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPet),
      });

      if (!response.ok) {
        throw new Error("Failed to add pet");
      }

      const pet = await response.json();
      setUser((prev: any) => ({ ...prev, pets: [...(prev.pets || []), pet] }));
      setNewPet({ name: "", type: "", photo: "" });
    } catch (err) {
      console.error("Error adding pet:", err);
    }
  };


/*   const handleDeletePet = async (petId: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }

      // Удаляем питомца из локального состояния
      setUser((prev: any) => ({
        ...prev,
        pets: prev.pets.filter((pet: any) => pet.id !== petId),
      }));
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  }; */



  return (
    
    <div className="mt-6">
          <h3 className="text-lg font-semibold">Add a New Pet</h3>
          <div className=" border rounded p-2 mb-2 ">
            <div className="mb-4">
              <label className=" font-semibold">Name:</label>
              <input
                type="text"
                name="name"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Type:</label>
              <select
                name="type"
                value={newPet.type}
                onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="" disabled>Select Type</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="bird">Bird</option>
                <option value="rodents">Rodent</option>
              </select>
            </div>
            <div className="mb-4">
              <label className=" font-semibold">Photo:</label>
              <input
                type="text"
                name="photo"
                value={newPet.photo}
                onChange={(e) => setNewPet({ ...newPet, photo: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <button
              onClick={handleAddPet}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Pet
            </button>
          </div>
        </div>
  );
};

export default PetPage;
