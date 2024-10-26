import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useKindeAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Analytics",
      path: ROUTES.DASHBOARD,
      module: "dashboard",
    },
    {
      name: "Tasks",
      path: ROUTES.TASKS,
      module: "tasks",
    },
    {
      name: "Employees",
      path: ROUTES.EMPLOYEES,
      module: "employees",
    },
    {
      name: "Profile",
      path: ROUTES.PROFILE,
      module: "profile",
    },
  ];
  return (
    <div className="w-[25%] bg-[#eaeaea] h-full flex flex-col pt-5 gap-12">
      <div className="flex justify-center items-center mx-auto  rounded-md w-[90%] h-[200px] ">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/task-management-7913d.appspot.com/o/images%2Fpng-transparent-software-performance-testing-software-testing-functional-testing-computer-icons-system-testing-performance-angle-logo-performance.png?alt=media&token=f8909e08-6662-4a60-ab69-b9ac10f89149"
          alt=""
        />
      </div>
      <div className="  h-[calc(100vh-200px)] flex flex-col justify-between">
        <ul className="flex flex-col gap-8  justify-center items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              className={`${
                location.pathname.split("dashboard/")[1]?.includes(item.module)
                  ? "bg-[#294664] text-white"
                  : "bg-transparent text-[#294664]"
              }  w-[90%] mx-auto border font-medium border-black flex justify-center items-center rounded-md py-3 capitalize hover:bg-[#294664] hover:text-white`}
              to={item.path}
            >
              {item.name}
            </Link>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => {
              logout();
              navigate(ROUTES.MAIN);
            }}
            className="bg-[#294664] w-[90%] mx-auto flex justify-center items-center rounded-md py-3 capitalize"
          >
            logout
          </Button>{" "}
          {/* copyright */}
          <p className="w-full text-center text-sm pb-3">
            copyright right reserved @ 2023 ahmed-dev{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
