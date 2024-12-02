import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Pets from "./Pets";
import Bookings from "./Bookings";
import ServicesCategories from "./ServicesCategories";
import Services from "./Services";

const AdminApp: React.FC = () => {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1">

          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="services_categories" element={<ServicesCategories />} />
              <Route path="services" element={<Services />} />
              <Route path="users" element={<Users />} />
              <Route path="pets" element={<Pets />} />
              <Route path="bookings" element={<Bookings />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminApp;