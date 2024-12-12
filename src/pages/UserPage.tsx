import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import UserService from '../pages/UserServiceCategory';
import profilePhoto from '../asets/images/user.png';
import star from '../asets/images/star.png';
import emptyStar from '../asets/images/empty-star.png';
import halfstar from '../asets/images/half-star.png';
import TempUserBookings from './TempUserBookings';
import UserReviewsPage from './UserReviewsPage';
import PetPage from './PetPage';
import MySittingRequests from './MySittingRequests';
import MyPetBookings from './MyPetBookings';

const UserPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [editableUser, setEditableUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'services' | 'pets' | 'bookingsAsSitter' | 'bookingsAsOwner' | 'logout' | 'personal' | 'reviews'>('personal'); // Состояние для выбранной секции
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsLoggedOut } = useContext(AuthContext);

  const DEFAULT_PHOTO = profilePhoto;

  // Функция для отображения рейтинга в виде звезд
  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating); 
    const halfStar = rating % 1 >= 0.5; 
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0); 

    return (
      <div className='flex'>
        {Array.from({ length: filledStars }).map((_, index) => (
          <img
            key={`filled-${index}`}
            src={star}
            alt="Filled Star"
            style={{ width: "20px", height: "20px", margin: "0 2px" }}
          />
        ))}
        {halfStar && (
          <img
            src={halfstar}
            alt="Half Star"
            style={{ width: "20px", height: "20px", margin: "0 2px" }}
          />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <img
            key={`empty-${index}`}
            src={emptyStar}
            alt="Empty Star"
            style={{ width: "20px", height: "20px", margin: "0 2px" }}
          />
        ))}
      </div>
    );
  };
  
  // Проверка истечения срока действия токена
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
      return payload.exp < currentTime; // Истёк ли токен
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true; // Если ошибка, считаем токен недействительным
    }
  };

  // Функция для получения данных пользователя
  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      setIsLoggedOut(true);
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

      // Устанавливаем стандартное фото, если его нет
      if (!userData.photo) {
        userData.photo = DEFAULT_PHOTO;
      }

      setUser(userData);
      setEditableUser(userData);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    }
  }, [navigate, DEFAULT_PHOTO, setIsLoggedIn, setIsLoggedOut]);

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsLoggedOut(true);
    navigate('/login');
  };

  // Обработчик изменений в формах
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableUser((prev: any) => ({ ...prev, [name]: value }));
  };

  // Функция сохранения изменений в профиле
  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      navigate('/login');
      return;
    }
  
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

  // Состояние для загружаемого фото
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  // Функция загрузки фото
  const handlePhotoUpload = async () => {
    if (!photoFile) {
      alert("Please select a file to upload.");
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) return;

    const formData = new FormData();
    formData.append('file', photoFile);
    formData.append('folder', '/asets/images'); // Вы можете указать любую папку

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
      setEditableUser((prev: any) => ({ ...prev, photo: fileUrl }));
      alert('Photo uploaded successfully.');
    } catch (err) {
      console.error("Error uploading photo:", err);
      alert('Failed to upload photo.');
    }
  };


  // Функция для удаления аккаунта
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

      // При успешном удалении
      localStorage.removeItem('authToken');
      setIsLoggedOut(true);
      navigate('/goodbye'); // Перенаправление на страницу прощания или главную
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user account.");
    }
  };

  // Инициализация данных пользователя и питомцев
  useEffect(() => {
    fetchUserData();
   // fetchPets();
  }, [fetchUserData]);

  // Отображение ошибки, если она есть
  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  // Отображение загрузки, если данные еще не получены
  if (!user) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Левая колонка: Информация о пользователе, кнопки */}
        <div className="w-full p-8 border rounded">
          
        <div className="mb-4">
          <img src={user.photo || DEFAULT_PHOTO} alt="" className="w-32 h-32 object-cover rounded-full mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">{user.firstName} {user.lastName}</h2>
              {/* Кнопки для переключения секций*/}
              <div className="mt-6">

              <button
                  onClick={() => setSelectedSection('personal')}
                  className={`w-full mb-2 profile-button ${selectedSection === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  My Personal Data 

                </button>

                <button
                  onClick={() => setSelectedSection('services')}
                  className={`w-full mb-2 profile-button ${selectedSection === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  My Services
                </button>

                <button
                  onClick={() => setSelectedSection('pets')}
                  className={`w-full mb-2 profile-button ${selectedSection === 'pets' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  My Pets
                </button>

                <button
                  onClick={() => setSelectedSection('bookingsAsOwner')}
                  className={`w-full mb-2 profile-button ${selectedSection === 'bookingsAsOwner' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  My Pet Bookings
                </button>

                <button
                  onClick={() => setSelectedSection('bookingsAsSitter')}
                  className={`w-full mb-2 profile-button ${selectedSection === 'bookingsAsSitter' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  My Sitting Requests
                </button>

                <button
                  onClick={() => setSelectedSection('reviews')}
                  className={`w-full mb-2 profile-button ${selectedSection === 'reviews' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  View Reviews
                </button>

                <button
                  onClick={handleLogout}
                  className={`w-full red-button ${selectedSection === 'logout' ? 'bg-blue-500  text-white' : 'bg-gray-200 text-gray-700  hover:bg-red-700'}`}
                >
                  Logout
                </button>

              </div>

        </div>

        {/* Правая колонка: Основной контент в зависимости от выбранной секции */}
        <div className="md:col-span-2 w-full p-8 border rounded">
        {selectedSection === 'personal' && (
            <div>
              {isEditing ? (
            <>
              {/* Форма редактирования профиля */}
              <div className="mb-4">
                <label className="block font-semibold">Photo:</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handlePhotoUpload}
                  className="mt-2 profile-button"
                >
                  Upload Photo
                </button>
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
                  className="mt-2 w-1/2 green-button"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="mt-2 w-1/2 red-button"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>

              <h3 className="text-2xl font-bold mb-4">My Personal Data</h3>
              {/* Отображение информации о пользователе */}
              {/*<div className="mb-4">
                <img src={user.photo || DEFAULT_PHOTO} alt="" className="w-32 h-32 object-cover rounded-full mx-auto" />
              </div>*/}
              <p><strong>Name:</strong> {user.firstName}</p>
              <p><strong>Last name:</strong> {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Description:</strong> {user.description}</p>
              <p className="flex space-x-2"><strong>Rating:</strong> {renderStars(user.averageStars)}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full profile-button"
                >
                  Edit
                </button>
                
              </div>
              <div className="flex space-x-2 mt-2">
            
                <button
                  onClick={handleDelete}
                  className="w-full red-button"
                >
                  Delete Account
                </button>
              </div>
              </>
          )}
            </div>
          )}

          {selectedSection === 'services' && (
            <div>
              {/*<h3 className="text-2xl font-bold mb-4">My Services</h3>*/}
              <UserService />
            </div>
          )}

          {selectedSection === 'pets' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">My Pets</h3>
              <PetPage />
              
            </div>
          )}
          
          {selectedSection === 'bookingsAsSitter' && (
            <div>
              <MySittingRequests />
            </div>
          )}

          {selectedSection === 'bookingsAsOwner' && (
            <div>
              <MyPetBookings />
            </div>
          )}

          {selectedSection === 'reviews' && (
            <div>
              <UserReviewsPage />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default UserPage;
