import React, { useState, createContext } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './pages/UserPage';
import PetPage from './pages/PetPage';
import ServicePage from './pages/ServicePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import FooterPage from './pages/Footer';
import myImage from './asets/logo.jpg'; // Убедитесь, что путь к логотипу правильный
import AdminApp from './pages/admin/AdminApp';
import ServicesByCategory from './pages/ServicesByCategory';
import BookingDetails from './pages/BookingDetails';
import BookingDetailsPage from './pages/BookingDetailsPage';
import CategoriesPage from './pages/CategoriesPage';

import ReviewPage from "./pages/ReviewPage";
import UserReviewsPage from "./pages/UserReviewsPage";
import RestoreAccountPage from "./pages/RestoreAccountPage";
import SittersReviewsPage from "./pages/SittersReviewsPage";

// Создаем контекст для авторизации
export const AuthContext = createContext({
  isLoggedIn: false,
  isLoggedOut: false,
  setIsLoggedIn: (value: boolean) => { },
  setIsLoggedOut: (value: boolean) => { },
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken')); // Проверка токена
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для гамбургер-меню

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoggedOut, setIsLoggedIn, setIsLoggedOut }}>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Navigation panel */}
          <div className="bg-white shadow-md py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link to="/">
                    <img src={myImage} alt="Logo" className="h-16 w-auto my-2" />
                  </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-theme-blue focus:outline-none"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:items-center md:space-x-6">
                  {/* Left navigation */}
                  <nav className="flex space-x-6">
                    <Link to="/categories" className="text-gray-700 hover:text-theme-blue">
                      Categories
                    </Link>
                    <Link to="/contacts" className="text-gray-700 hover:text-theme-blue">
                      Contacts
                    </Link>
                  </nav>

                  {/* Right navigation */}
                  <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                      <>
                      <Link to="/user" className="hover:text-theme-blue">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/8188/8188360.png"
                          alt="Profile Icon"
                          className="h-6 w-6"
                        />
                      </Link>
                                    <Link to="/review" className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-theme-blue-light" >
                                        Leave review
                                    </Link>
                                    </>
                    ) : (
                      <>
                        <Link to="/register" className="text-gray-700 hover:text-theme-blue">
                          Sign up
                        </Link>
                        <Link to="/login" className="text-gray-700 hover:text-theme-blue">
                          Log in
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    to="/categories"
                    className="block text-gray-700 hover:text-theme-blue px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link
                    to="/contacts"
                    className="block text-gray-700 hover:text-theme-blue px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contacts
                  </Link>
                  {isLoggedIn ? (
                    <Link
                      to="/user"
                      className="block text-gray-700 hover:text-theme-blue px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="block text-gray-700 hover:text-theme-blue px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/login"
                        className="block text-gray-700 hover:text-theme-blue px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log in
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/pets" element={<PetPage />} />
              <Route path="/services" element={<ServicePage />} />
              {/*<Route path="/services/:categoryName" element={<ServiceListPage />} />*/}
              <Route path="/services/:categoryId" element={<ServicesByCategory />} />
              {/*<Route path="/booking/:serviceId" element={<BookingPage />} />*/}
              <Route path="/booking/:serviceId" element={<BookingDetails />} />
              <Route path="/bookings/:id" element={<BookingDetailsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/*" element={<AdminApp />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/user-reviews" element={<UserReviewsPage />} />
              <Route path="/restore-account" element={<RestoreAccountPage />} />
            </Routes>
          </div>

          {/* Footer */}
          <FooterPage />
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
