import React, {useState, createContext, useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import UserPage from './pages/UserPage';
import PetPage from './pages/PetPage';
import ServicePage from './pages/ServicePage';
import ServiceCategoryPage from './pages/ServiceCategoryPage';
import ServiceListPage from './pages/ServiceListPage';
import BookingPage from './pages/BookingPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import FooterPage from './pages/Footer';
import myImage from './asets/logo.jpg';
import ReviewPage from "./pages/ReviewPage";
import UserReviewsPage from "./pages/UserReviewsPage";
import RestoreAccountPage from "./pages/RestoreAccountPage";

// Создаем контекст для авторизации
export const AuthContext = createContext({
    isLoggedIn: false,
    isLoggedOut: false,
    setIsLoggedIn: (value: boolean) => {
    },
    setIsLoggedOut: (value: boolean) => {
    },
});

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken')); // Проверка токена
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    return (
        <AuthContext.Provider value={{isLoggedIn, isLoggedOut, setIsLoggedIn, setIsLoggedOut}}>
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
                                <img src={myImage} alt="Logo" className="h-16 w-auto"/>
                            </Link>
                        </div>

                        {/* Right navigation */}
                        <div className="flex items-center space-x-4">
                            {isLoggedIn ? (
                                <>
                                    <a href="/user" className="hover:text-theme-blue">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/8188/8188360.png"
                                            alt="Profile Icon"
                                            className="h-6 w-6"
                                        />
                                    </a>
                                    {/* Кнопка оставить отзыв */}
                                    <Link
                                        to="/review"
                                        className="bg-theme-blue text-white px-4 py-2 rounded-md hover:bg-theme-blue-light"
                                    >
                                        Оставить отзыв
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

                    {/* Main Content */}
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/user" element={<UserPage/>}/>
                            <Route path="/pets" element={<PetPage/>}/>
                            <Route path="/services" element={<ServicePage/>}/>
                            <Route path="/services/:categoryName" element={<ServiceListPage/>}/>
                            <Route path="/booking/:serviceId" element={<BookingPage/>}/>
                            <Route path="/categories" element={<ServiceCategoryPage/>}/>
                            <Route path="/contacts" element={<Contacts/>}/>
                            <Route path="/register" element={<RegistrationPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/review" element={<ReviewPage/>}/>
                            <Route path="/user-reviews" element={<UserReviewsPage/>}/>
                            <Route path="/restore-account" element={<RestoreAccountPage />} />
                        </Routes>
                    </div>

                    {/* Footer */}
                    <FooterPage/>
                </div>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
