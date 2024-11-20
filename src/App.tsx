import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './pages/UserPage';
import PetPage from './pages/PetPage';
import ServicePage from './pages/ServicePage';
import ServiceCategoryPage from './pages/ServiceCategoryPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import FooterPage from './pages/Footer';
import myImage from './asets/logo.jpg';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation panel */}
        <div className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
          {/* Left navigation */}
          <nav className="flex space-x-6">
            <Link to="/categories" className="text-gray-700 hover:text-theme-blue">
              Categories
            </Link>
            <Link to="/contacts" className="text-gray-700 hover:text-theme-blue">
              Contacts
            </Link>
          </nav>

        {/* Logo */}
<div className="flex justify-center">
  <Link to="/">
    <img src={myImage} alt="Logo" className="h-[72px]" />
  </Link>
</div>
          {/* Right navigation */}
          <div className="flex items-center space-x-4">
            <a href="/user" className="hover:text-theme-blue">
              <img
                src="https://cdn-icons-png.flaticon.com/512/8188/8188360.png"
                alt="Profile Icon"
                className="h-6 w-6"
              />
            </a>
            <Link to="/register" className="text-gray-700 hover:text-theme-blue">
              Sign up
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-theme-blue">
              Log in
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Главная страница */}
            <Route path="/user" element={<UserPage />} />
            <Route path="/pets" element={<PetPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/categories" element={<ServiceCategoryPage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <FooterPage />
      </div>
    </Router>
  );
};

export default App;
