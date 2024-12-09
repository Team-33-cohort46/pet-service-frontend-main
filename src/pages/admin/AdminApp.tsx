import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Pets from "./Pets";
import Bookings from "./Bookings";
import ServicesCategories from "./ServicesCategories";
import Services from "./Services";
import EditUser from "./EditUser";

const AdminApp: React.FC = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Admin Panel
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="services_categories" element={<ServicesCategories />} />
            <Route path="services" element={<Services />} />
            <Route path="users" element={<Users />} />
            <Route path="users/edit/:userId" element={<EditUser />} />
            <Route path="pets" element={<Pets />} />
            <Route path="bookings" element={<Bookings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;