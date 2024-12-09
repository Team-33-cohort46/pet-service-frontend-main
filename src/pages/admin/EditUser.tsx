import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  photo?: string;
}

const defaultAvatar = "../assets/images/profile-logo.png";

const EditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/admin/users/${userId}`, {
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
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (user) {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to save user data.");
      }

      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      setError("An error occurred while saving user data.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-center text-gray-500">User not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 mt-8 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit User
      </h1>
      <div className="mb-6 flex justify-center">
        <img
          src={user.photo || defaultAvatar}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={user.description}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditUser;
