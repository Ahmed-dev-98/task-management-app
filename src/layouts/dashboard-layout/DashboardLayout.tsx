import { Outlet } from "react-router";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="w-full  bg-red-500 flex flex-col">
        <Navbar />
        <div className="px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
