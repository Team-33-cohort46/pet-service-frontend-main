import React, { useState, useEffect } from "react";

interface ServicesCategory{
  id: number;
  title: string;
  };


const ServicesCategories: React.FC = () => {
  const [servicesCategories, setServicesCategories] = useState<ServicesCategory[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryTitle, setEditCategoryTitle] = useState<string>("");

  useEffect(() => {
    fetch("/api/services_categories") 
      .then((response) => response.json())
      .then((data) => setServicesCategories(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategoryTitle.trim()) {
      alert("Please enter a category title.");
      return;
    }

    const token = localStorage.getItem("authToken"); // Получаем токен из localStorage

    // POST request to add new category
    const response = await fetch("/api/admin/services_categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({ title: newCategoryTitle }),
    });

    if (response.ok) {
      const newCategory = await response.json();
      setServicesCategories((prevCategories) => [...prevCategories, newCategory]);
      setNewCategoryTitle(""); 
    } else {
      console.error("Failed to add category");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const token = localStorage.getItem("authToken"); 

    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    // DELETE request to remove the category
    const response = await fetch(`/api/admin/services_categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setServicesCategories((prevCategories) => prevCategories.filter((c) => c.id !== id));
    } else {
      console.error("Failed to delete category");
      alert("Failed to delete category");
    }
  };
  const handleEditCategory = (id: number, currentTitle: string) => {
    setEditCategoryId(id);
    setEditCategoryTitle(currentTitle);
  };

  const handleSaveEdit = async () => {
    if (!editCategoryTitle.trim()) {
      alert("Category title cannot be empty.");
      return;
    }

    const token = localStorage.getItem("authToken");

    const response = await fetch(`/api/admin/services_categories/${editCategoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editCategoryTitle }),
    });

    if (response.ok) {
      const updatedCategory = await response.json();
      setServicesCategories((prevCategories) =>
        prevCategories.map((c) =>
          c.id === updatedCategory.id ? updatedCategory : c
        )
      );
      setEditCategoryId(null);
      setEditCategoryTitle("");
    } else {
      console.error("Failed to update category");
      alert("Failed to update category");
    }
  };

  const handleCancelEdit = () => {
    setEditCategoryId(null);
    setEditCategoryTitle("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Services categories</h1>
      <div className="mb-4">
        <form onSubmit={handleAddCategory} className="flex items-center space-x-4">
          <input
            type="text"
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
            placeholder="New category title"
            className="p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Category
          </button>
        </form>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {servicesCategories.map((c) => (
            <tr key={c.id}>
              <td className="border border-gray-300 p-2">
                {editCategoryId === c.id ? (
                  <input
                    type="text"
                    value={editCategoryTitle}
                    onChange={(e) => setEditCategoryTitle(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  />
                ) : (
                  c.title
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editCategoryId === c.id ? (
                  <>
                    <button
                      className="bg-green-500 text-white p-2 rounded mr-2"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white p-2 rounded"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white p-2 rounded mr-2"
                      onClick={() => handleEditCategory(c.id, c.title)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={() => handleDeleteCategory(c.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesCategories;
