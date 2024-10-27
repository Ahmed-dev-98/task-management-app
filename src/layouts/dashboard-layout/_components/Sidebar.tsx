import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeSidebar, selectSidebar } from "@/store/slices/sidebar.slice";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { ArrowLeft, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout, getPermission } = useKindeAuth();
  const location = useLocation();
  const isOpen = useAppSelector(selectSidebar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isManager = getPermission && getPermission("is-manager").isGranted;
  const navItems = [
    {
      name: "Analytics",
      path: ROUTES.DASHBOARD,
      module: "dashboard",
      hasAccess: isManager,
    },
    {
      name: "Tasks",
      path: ROUTES.TASKS,
      module: "tasks",
      hasAccess: true,
    },
    {
      name: "Employees",
      path: ROUTES.EMPLOYEES,
      module: "employees",
      hasAccess: isManager,
    },
    {
      name: "Profile",
      path: ROUTES.PROFILE,
      module: "profile",
      hasAccess: true,
    },
  ];
  return (
    <div
      className={`${
        isOpen.close ? "w-0" : "w-[25%]"
      } bg-[#f5f5f5] h-full flex flex-col transition-all delay-300 duration-500 ease-in-out overflow-hidden`}
    >
      {/* Sidebar Header */}
      <div
        className={`${
          isOpen.close ? "opacity-0" : ""
        } transition-all duration-300 w-full flex items-center justify-between px-4 py-5 bg-[#eaeaea] shadow-sm`}
      >
        <h2 className="font-bold text-[#294664]">Task Manager</h2>
        <Button
          variant="outline"
          className="p-2"
          onClick={() => dispatch(closeSidebar())}
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      <div
        className={`${
          isOpen.close ? "opacity-0" : ""
        } transition-all duration-300 flex flex-col justify-between h-[calc(100vh-100px)] px-4 py-6`}
      >
        <ul className="space-y-3">
          {navItems.map(
            (item, index) =>
              item.hasAccess && (
                <li key={index} className="w-full">
                  <Link
                    className={`${
                      location.pathname
                        .split("dashboard/")[1]
                        ?.includes(item.module)
                        ? "bg-[#294664] text-white"
                        : location.pathname === "/dashboard" &&
                          item.name === "Analytics"
                        ? "bg-[#294664] text-white"
                        : "bg-transparent text-[#294664]"
                    }  w-[90%] mx-auto border font-medium border-black flex justify-center items-center rounded-md py-3 capitalize hover:bg-[#294664] hover:text-white`}
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                </li>
              )
          )}
        </ul>

        <div className="space-y-4">
          <Button
            onClick={() => {
              logout();
              navigate(ROUTES.MAIN);
            }}
            className="bg-[#294664] w-full flex justify-center items-center text-white rounded-md py-3 capitalize transition hover:bg-[#1f3a56]"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
          <footer className="text-center text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Ahmed-dev. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
