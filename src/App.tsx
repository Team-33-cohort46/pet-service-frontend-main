// App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './pages/UserPage';
import PetPage from './pages/PetPage';
import ServicePage from './pages/ServicePage';
import ServiceCategoryPage from './pages/ServiceCategoryPage';
import Modal from './pages/ModalRegistration';
import LoginModal from './pages/ModalLogin';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import FooterPage from './pages/Footer';
import myImage from './asets/logo.jpg';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  return (
    <Router>
      <div>
        {/* Navigation panel */}
        <div className="pt-3 text-center pb-5 grid grid-cols-3 bg-white">
          {/* Left navigation */}
          <div>
            <nav>
              <ul className="flex space-x-2 ml-2 mt-2">
                <Link to="/categories">
                  <li className="cursor-pointer hover:text-white hover:bg-theme-blue px-2 py-1 rounded-sm">
                    Categories
                  </li>
                </Link>
                <Link to="/contacts">
                  <li className="cursor-pointer hover:text-white hover:bg-theme-blue px-2 py-1 rounded-sm">
                    Contacts
                  </li>
                </Link>
              </ul>
            </nav>
          </div>

          {/* logo */}
          <div>
            <Link to="/" className="grid place-items-center">
              <img src={myImage} alt="Logo" className="w-3/5" />
            </Link>
          </div>

          {/* Righ navigation */}
          <div className="space-x-2">
            <button className="px-2 py-1 rounded-sm    ">
            <a href="/user">
                <img src='https://cdn-icons-png.flaticon.com/512/8188/8188360.png' alt="Icon profile" className="h-6 w-6" />
              </a>
            </button>
            <button
              onClick={handleOpenModal}
              className="hover:text-white hover:bg-theme-blue px-2 py-1 rounded-sm -mt-8"
            >
              Sign up
            </button>
            <button
              onClick={handleOpenLoginModal}
              className="hover:text-white hover:bg-theme-blue px-2 py-1 rounded-sm"
            >
              Log in
            </button>
          </div>
        </div>

        {/* Routing */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Главная страница */}
          <Route path="/user" element={<UserPage />} />
          <Route path="/pets" element={<PetPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/categories" element={<ServiceCategoryPage />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>

        {/* Modal windows*/}
        <Modal show={showModal} onClose={handleCloseModal} />
        <LoginModal show={showLoginModal} onClose={handleCloseLoginModal} />
      </div>
      <FooterPage />
    </Router>
  );
};

export default App;
