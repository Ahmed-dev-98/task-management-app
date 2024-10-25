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
    },
    {
      name: "Tasks",
      path: ROUTES.TASKS,
    },
    {
      name: "Profile",
      path: ROUTES.PROFILE,
    },
  ];
  return (
    <div className="w-[25%] bg-gray-400 h-full flex flex-col pt-5 gap-12">
      <div className="flex justify-center items-center mx-auto bg-red-300 rounded-md w-[90%] h-[200px]">
        logo
      </div>
      <div className="bg-teal-800  h-[calc(100vh-200px)] flex flex-col justify-between">
        <ul className="flex flex-col gap-8 bg-red-400 justify-center items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              className={`${
                location.pathname.includes(item.path)
                  ? "bg-red-600"
                  : "bg-red-100"
              }  w-[90%] mx-auto flex justify-center items-center rounded-md py-3 capitalize`}
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
            className="bg-red-800 w-[90%] mx-auto flex justify-center items-center rounded-md py-3 capitalize"
          >
            logout
          </Button>{" "}
          {/* copyright */}
          <p className="w-full text-center text-sm pb-3">
            copyright all right reserved @ 2023 for ahmed-dev{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
