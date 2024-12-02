

// src/pages/Home.tsx
import React from 'react';
import ServiceCategoryPage from './ServiceCategoryPage'; // 
import backgroundImage from '../asets/images/main.jpg'; // 
import CategoriesPage from './CategoriesPage';

const Home: React.FC = () => {
  return (
    <div>
      {/* Header section with background image and welcome message */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: '70vh', // Set height to 70% of viewport height
        }}
      >
        {/* Overlay to darken the background image */}
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div> {/* Добавлен z-10 */}
        {/* Content inside the header */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4"> {/* Добавлен z-20 */}
          <h1 className="text-[54px] font-bold text-center mb-6 mt-2 text-white leading-tight">
            Welcome to Pet Service
          </h1>
          <p className="text-[27px] text-center text-white">
            Here you can find the best pet sitters for your pets!
          </p>
        </div>
      </div>

      {/* Display service categories 
      <ServiceCategoryPage /> ПОДМЕНИЛА КОМПОНЕНТ!!!*/}
      <CategoriesPage />

      {/* "How It Works" section */}
      <div className="bg-white py-8">
        <h2 className="text-[18px] font-bold text-center mb-6">How It Works</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Block 1 */}
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center mb-3">
                <span className="text-white text-[14.4px]">1</span>
              </div>
              <h3 className="text-[11.52px] font-semibold mb-2">
                Discover Trusted Sitters Near You
              </h3>
              <p className="text-gray-600 text-xs">
                Explore a community of loving and reliable pet sitters in your area, ready to care
                for your furry friends.
              </p>
            </div>
            {/* Block 2 */}
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-green-500 flex items-center justify-center mb-3">
                <span className="text-white text-[14.4px]">2</span>
              </div>
              <h3 className="text-[11.52px] font-semibold mb-2">
                Book Easily, Pay Securely
              </h3>
              <p className="text-gray-600 text-xs">
                Check availability, schedule a meeting, and confirm your booking with a simple and
                secure online payment system.
              </p>
            </div>
            {/* Block 3 */}
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-purple-500 flex items-center justify-center mb-3">
                <span className="text-white text-[14.4px]">3</span>
              </div>
              <h3 className="text-[11.52px] font-semibold mb-2">
                Enjoy Peace of Mind
              </h3>
              <p className="text-gray-600 text-xs">
                Your pet will be pampered in a loving environment, supported by premium insurance
                and 24/7 customer care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

