import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [editableUser, setEditableUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsLoggedOut } = useContext(AuthContext);

  const fetchUserData = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("/api/auth/me", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
      setEditableUser(userData);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsLoggedOut(true);
    navigate('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableUser((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const response = await fetch("/api/auth/me", {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editableUser),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user data: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to update user data.");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/auth/me/${user.email}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
      }

      // On successful deletion
      localStorage.removeItem('authToken');
      setIsLoggedOut(true);
      navigate('/goodbye'); // Redirect to a farewell or main page
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user account.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-lg w-full p-8 bg-white shadow-md rounded">
          <h2 className="text-2xl font-semibold mb-6 text-center">Welcome {user.firstName}</h2>

          {isEditing ? (
              <>
                <div className="mb-4">
                  <label className="block font-semibold">Photo:</label>
                  <input
                      type="text"
                      name="photo"
                      value={editableUser.photo}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Name:</label>
                  <input
                      type="text"
                      name="firstName"
                      value={editableUser.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Last name:</label>
                  <input
                      type="text"
                      name="lastName"
                      value={editableUser.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Description:</label>
                  <textarea
                      name="description"
                      value={editableUser.description}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                      onClick={handleSave}
                      className="mt-2 w-1/2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button>
                  <button
                      onClick={() => setIsEditing(false)}
                      className="mt-2 w-1/2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
          ) : (
              <>
                <p><strong>Photo:</strong> {user.photo}</p>
                <p><strong>Name:</strong> {user.firstName}</p>
                <p><strong>Last name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Description:</strong> {user.description}</p>
                <p><strong>Rating:</strong> {user.averageStars.toFixed(1)}</p>
                <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                {/* New Button for Viewing Reviews */}
                <button
                    onClick={() => navigate('/user-reviews')}
                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Reviews
                </button>
              </>
          )}

          <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>

          <button
              onClick={handleDelete}
              className="mt-6 w-full bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
          >
            Delete Account
          </button>
        </div>
      </div>
  );
};

export default UserProfilePage;


