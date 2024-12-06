import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <Link to="/admin" className="hover:text-gray-400">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/services_categories" className="hover:text-gray-400">
            Services categories
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/services" className="hover:text-gray-400">
            Services
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/users" className="hover:text-gray-400">
            Users
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/pets" className="hover:text-gray-400">
            Pets
          </Link>
        </li>
        <li>
          <Link to="/admin/bookings" className="hover:text-gray-400">
            Bookings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
