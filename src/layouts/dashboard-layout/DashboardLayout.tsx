import { Outlet, useNavigate } from "react-router";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import ModuleContainer from "@/shared/ui/modules-container";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setUser } from "@/store/slices/auth.slice";
import { ROUTES } from "@/app/router/routes";
import {
  createEmployeeAction,
  selectEmployees,
} from "@/store/slices/employees.slice";
import ApiLoader from "@/shared/ui/api-loader";

const DashboardLayout = () => {
  const { isLoading, isAuthenticated, getUser } = useKindeAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const empoyees = useAppSelector(selectEmployees);
  const injectUser = () => {
    const user = empoyees.find((emp) => emp.id === getUser().id);
    if (!user) {
      dispatch(createEmployeeAction({ ...getUser(), tasks: [] }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUser({ ...getUser(), tasks: [] }));
      // added this fn to add user when using kinde auth
      injectUser();
      navigate(ROUTES.TASKS);
    }
  }, [isAuthenticated]);
  if (isLoading)
    return (
      <div className="w-full h-screen ">
        <ApiLoader />
      </div>
    );

  return (
    <div className="flex h-screen w-full ">
      <Sidebar />

      <div className="w-full  bg-[#f9fafc] flex flex-col">
        <Navbar />
        <div className="w-full h-[calc(100%-200px)]">
          <ModuleContainer>
            <Outlet />
          </ModuleContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
