import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="w-full mx-auto flex justify-start items-start h-[calc(100%-200px)] ">
      <Outlet />
    </div>
  );
};

export default Layout;
