import React from 'react';
import myImage from '../asets/logo.png'; 
import { Link } from 'react-router-dom';

const FooterPage: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Логотип */}
        <div className="flex justify-center text-teal-600">
          <a href="/" className="flex items-center">
            <img src={myImage} alt="Logo" className="h-10 w-auto" />
          </a>
        </div>

        {/* Текстовое описание */}
        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-gray-500">
          We provide the best pet sitting services to ensure your pets are happy and safe.
        </p>

        {/* Навигационные ссылки */}
        <ul className="mt-6 flex flex-wrap justify-center gap-4 md:gap-6">
          
          
          <li>
          <Link to="/categories" className="text-gray-700 hover:text-gray-900 text-sm">
                      Categories
                    </Link>
          </li>
          <li>
          <Link to="/contacts" className="text-gray-700 hover:text-gray-900 text-sm">
                      Contacts
                    </Link>
          </li>
        </ul>

        {/* Социальные сети */}
        <ul className="mt-6 flex justify-center gap-6">
          {/* Facebook */}
          <li>
            <a
              href="https://facebook.com"
              rel="noopener noreferrer"
              target="_blank"
              className="text-gray-700 hover:text-gray-900"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          {/* Instagram */}
          <li>
            <a
              href="https://instagram.com"
              rel="noopener noreferrer"
              target="_blank"
              className="text-gray-700 hover:text-gray-900"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.004 2.004c2.76 0 3.093.011 4.187.06 1.063.048 1.792.22 2.44.466a5.131 5.131 0 011.858 1.205 5.131 5.131 0 011.205 1.858c.246.648.418 1.377.466 2.44.049 1.094.06 1.427.06 4.187s-.011 3.093-.06 4.187c-.048 1.063-.22 1.792-.466 2.44a5.131 5.131 0 01-1.205 1.858 5.131 5.131 0 01-1.858 1.205c-.648.246-1.377.418-2.44.466-1.094.049-1.427.06-4.187.06s-3.093-.011-4.187-.06c-1.063-.048-1.792-.22-2.44-.466a5.131 5.131 0 01-1.858-1.205 5.131 5.131 0 01-1.205-1.858c-.246-.648-.418-1.377-.466-2.44-.049-1.094-.06-1.427-.06-4.187s.011-3.093.06-4.187c.048-1.063.22-1.792.466-2.44a5.131 5.131 0 011.205-1.858 5.131 5.131 0 011.858-1.205c.648-.246 1.377-.418 2.44-.466 1.094-.049 1.427-.06 4.187-.06zm0 1.8c-2.737 0-3.06.011-4.131.06-.935.043-1.45.203-1.794.337-.452.172-.775.379-1.117.722-.343.342-.55.665-.722 1.117-.134.344-.294.859-.337 1.794-.049 1.072-.06 1.395-.06 4.131s.011 3.06.06 4.131c.043.935.203 1.45.337 1.794.172.452.379.775.722 1.117.342.343.665.55 1.117.722.344.134.859.294 1.794.337 1.072.049 1.395.06 4.131.06s3.06-.011 4.131-.06c.935-.043 1.45-.203 1.794-.337.452-.172.775-.379 1.117-.722.343-.342.55-.665.722-1.117.134-.344.294-.859.337-1.794.049-1.072.06-1.395.06-4.131s-.011-3.06-.06-4.131c-.043-.935-.203-1.45-.337-1.794-.172-.452-.379-.775-.722-1.117-.342-.343-.665-.55-1.117-.722-.344-.134-.859-.294-1.794-.337-1.072-.049-1.395-.06-4.131-.06zM12 6.6a5.4 5.4 0 110 10.8 5.4 5.4 0 010-10.8zm0 1.8a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2zm5.25-1.95a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          
        </ul>
      </div>
    </footer>
  );
};

export default FooterPage;
