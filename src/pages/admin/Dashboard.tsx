import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-orange-500 text-white p-4 rounded">Services categories: 3</div>
        <div className="bg-blue-500 text-white p-4 rounded">Users: 100</div>
        <div className="bg-green-500 text-white p-4 rounded">Pets: 50</div>
        <div className="bg-yellow-500 text-white p-4 rounded">Bookings: 75</div>
      </div>
    </div>
  );
};

export default Dashboard;
