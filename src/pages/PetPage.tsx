import React, { useEffect, useState } from 'react';

interface Pet {
  id: string;
  name: string;
  type: string;
  photo: string;
}

const PetPage: React.FC = () => {
  const [newPet, setNewPet] = useState({ name: "", type: "", photo: "" });
  const [pets, setPets] = useState<Pet[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (file.size > 1024 * 1024) { // Проверка на размер файла
      setErrorMessage("File size should not exceed 1MB.");
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', '/assets/images');

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const fileUrl = await response.text();
      setNewPet((prev) => ({ ...prev, photo: fileUrl }));
      setErrorMessage(null);
    } catch (err) {
      console.error("Error uploading photo:", err);
      setErrorMessage('Failed to upload photo.');
    }
  };

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
      setPets((prev) => [...prev, pet]);
      setNewPet({ name: "", type: "", photo: "" });
      setIsEditing(false); // Закрываем форму после добавления питомца
    } catch (err) {
      console.error("Error adding pet:", err);
    }
  };

  const handleCancel = () => {
    setNewPet({ name: "", type: "", photo: "" });
    setIsEditing(false); // Закрываем форму, не сохраняя изменения
  };

  const handleDeletePet = async (petId: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch(`/api/pets/me/${petId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }

      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  const fetchPets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch("api/pets/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }

      const pets = await response.json();
      setPets(pets);
    } catch (err) {
      console.error("Error fetching pets:", err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      <ul className="mt-2">
        {pets.map((pet) => (
          <li key={pet.id} className="p-2 mb-2 border rounded flex items-center relative">
            {/* Левая часть карточки (информация о питомце) */}
            <div className="flex-1">
              <p><strong>Name:</strong> {pet.name}</p>
              <p><strong>Type:</strong> {pet.type}</p>
            </div>

            {/* Правая часть карточки (фото и кнопка удаления) */}
            <div className="flex items-start justify-end ml-4">
              {pet.photo ? (
                <img src={pet.photo} alt={pet.name} className="mt-2 mb-10 w-32 h-32 object-cover rounded" />
              ) : (
                <p className="italic"></p>
              )}
            </div>

            {/* Кнопка удаления в нижнем углу */}
            <button
              onClick={() => handleDeletePet(pet.id)}
              className="red-button"
            >
              Delete Pet
            </button>
          </li>
        ))}
      </ul>

      {/* Форма добавления питомца */}
      <div className="mt-6 p-2 mb-2 border rounded flex items-center relative">
        {!isEditing ? (
          <details>
            <summary className="flex select-none text-center">
              <span className="w-full green-button"
                onClick={() => setIsEditing(true)}>
                Add a New Pet
              </span>
            </summary>
          </details>
        ) : (
          <div>
            <div className="mb-4">
              <label className="font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Type</label>
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
                <option value="fish">Fish</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="font-semibold">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 hidden"
                id="fileInput"
              />
              <button
                onClick={() => document.getElementById('fileInput')?.click()}
                className="mt-2 w-full profile-button"
              >
                Select and Upload Photo
              </button>

              {/* Превью загруженного фото */}
              {newPet.photo && (
                <div className="mt-4 flex justify-end">
                  <img
                    src={newPet.photo}
                    alt="Uploaded pet"
                    className="w-32 h-32 object-cover rounded border"
                  />
                  <p className="text-sm text-gray-500 mt-2">Uploaded photo preview</p>
                </div>
              )}
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="w-1/2 mr-1 red-button"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPet}
                className="w-1/2 green-button"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetPage;
