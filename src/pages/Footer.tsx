import React from 'react';
import myImage from '../asets/logo.png'; 

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
            <a className="text-gray-700 hover:text-gray-900 text-sm" href="/about">
              About
            </a>
          </li>
          <li>
            <a className="text-gray-700 hover:text-gray-900 text-sm" href="/careers">
              Careers
            </a>
          </li>
          <li>
            <a className="text-gray-700 hover:text-gray-900 text-sm" href="/services">
              Services
            </a>
          </li>
          <li>
            <a className="text-gray-700 hover:text-gray-900 text-sm" href="/contact">
              Contact
            </a>
          </li>
          <li>
            <a className="text-gray-700 hover:text-gray-900 text-sm" href="/blog">
              Blog
            </a>
          </li>
        </ul>

        {/* Социальные сети */}
        <ul className="mt-6 flex justify-center gap-6">
          {/* Facebook */}
          <li>
            <a
              href="https://facebook.com/yourpage"
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
              href="https://instagram.com/yourprofile"
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

          {/* Twitter */}
          <li>
            <a
              href="https://twitter.com/yourprofile"
              rel="noopener noreferrer"
              target="_blank"
              className="text-gray-700 hover:text-gray-900"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8 19c7.5 0 11.6-6.2 11.6-11.6v-.5A8.3 8.3 0 0022 4.3a8.2 8.2 0 01-2.4.7 4.1 4.1 0 001.8-2.3 8.3 8.3 0 01-2.6 1 4.1 4.1 0 00-7 3.7 11.7 11.7 0 01-8.5-4.3 4.1 4.1 0 001.3 5.5A4 4 0 012 9v.1a4.1 4.1 0 003.3 4 4.1 4.1 0 01-1.9.1 4.1 4.1 0 003.8 2.8A8.2 8.2 0 012 17.5a11.6 11.6 0 006 1.8"
                />
              </svg>
            </a>
          </li>

          {/* GitHub */}
          <li>
            <a
              href="https://github.com/yourprofile"
              rel="noopener noreferrer"
              target="_blank"
              className="text-gray-700 hover:text-gray-900"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.4 1 3 .8.1-.7.4-1 .6-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 .9-2.7-.1-.2-.4-1 .1-2 0 0 .8-.3 2.7 1a9.5 9.5 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1 .2 1.8.1 2a4 4 0 01.9 2.7c0 3.8-2.3 4.6-4.5 4.9.4.4.7 1 .7 2v3c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.52-4.48-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          {/* Dribbble */}
          <li>
            <a
              href="https://dribbble.com/yourprofile"
              rel="noopener noreferrer"
              target="_blank"
              className="text-gray-700 hover:text-gray-900"
            >
              <span className="sr-only">Dribbble</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.5 2 12s4.48 10 10 10c5.5 0 10-4.5 10-10S17.5 2 12 2zm6.6 4.6a8.5 8.5 0 011.9 5.3c-.3-.1-3.1-.6-5.9-.3-.1-.1-.1-.3-.2-.4-.2-.5-.4-1-.6-1.2 3.1-1.3 4.6-3.1 4.8-3.4zM12 3.5c2.2 0 4.1.8 5.7 2.1-.1.2-1.4 1.9-4.5 3.1-1.4-2.6-3-4.7-3.2-5A8.7 8.7 0 0112 3.5zm-3.6.8c.8 1 2.1 2.9 3.2 4.9-4 1-7.5 1-7.9 1A8.6 8.6 0 018.4 4.3zM3.5 12v-.3c.4 0 4.5.1 8.8-1.2.3.5.5 1 .7 1.5-.1 0-.2 0-.3.1-4.4 1.4-6.7 5.3-6.9 5.6A8.5 8.5 0 013.5 12zM12 20.5a8.5 8.5 0 01-5.2-1.8c.1-.3 1.9-3.7 6.7-5.3.1 0 .1 0 .1-.1a35.3 35.3 0 011.8 6.5 8.4 8.4 0 01-3.4.7zm4.8-1.5c-.1-.5-.5-3-1.7-6.1 2.7-.4 5 .3 5.3.4a8.5 8.5 0 01-3.6 5.7z"
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
