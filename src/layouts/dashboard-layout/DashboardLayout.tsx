import { Outlet } from "react-router";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import ModuleContainer from "@/shared/ui/modules-container";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="w-full  bg-slate-200 flex flex-col">
        <Navbar />
        <div className="w-full h-full">
          <ModuleContainer>
            <Outlet />
          </ModuleContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
