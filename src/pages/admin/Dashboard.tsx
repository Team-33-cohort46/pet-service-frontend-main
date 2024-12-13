import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const data = [
    { title: "Services categories",  link: "/admin/services_categories" },
    { title: "Services", link: "/admin/services" },
    { title: "Users", link: "/admin/users" },
    { title: "Pets",  link: "/admin/pets" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-8 mt-8 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        {data.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="w-full bg-white border p-4 rounded-lg shadow-md hover:bg-gray-100 transition transform hover:scale-105 flex items-center justify-between"
          >
            <h3 className="text-2xl font-semibold text-gray-700">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
