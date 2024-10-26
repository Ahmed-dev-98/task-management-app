import { Outlet } from "react-router";

const EmployeesLayout = () => {
  return (
    <div className="w-full mx-auto flex justify-start items-start h-[calc(100%-200px)] ">
      <Outlet />
    </div>
  );
};

export default EmployeesLayout;
