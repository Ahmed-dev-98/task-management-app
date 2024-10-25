import { Outlet, useNavigate } from "react-router";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import ModuleContainer from "@/shared/ui/modules-container";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/slices/auth.slice";
import { ROUTES } from "@/app/router/routes";

const DashboardLayout = () => {
  const { isLoading, isAuthenticated, getUser } = useKindeAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUser(getUser()));
      navigate(ROUTES.TASKS);
    }
  }, [isAuthenticated]);
  if (isLoading) return <>Loading...</>;

  return (
    <div className="flex h-screen w-full ">
      <Sidebar />

      <div className="w-full  bg-slate-200 flex flex-col">
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
