import { useAppDispatch, useAppSelector } from "@/store";
import { openSidebar, selectSidebar } from "@/store/slices/sidebar.slice";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { getUser, getPermission } = useKindeAuth();
  const isManager = getPermission && getPermission("is-manager");
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector(selectSidebar);
  const user = getUser();
  return (
    <div className="w-full h-16 bg-white border-b shadow-md px-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {sidebar.close && (
          <Menu
            className="cursor-pointer text-[#294664]"
            size={24}
            onClick={() => dispatch(openSidebar())}
          />
        )}
        <h1 className="font-semibold text-lg text-[#294664]">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full capitalize  flex justify-center items-center font-medium text-black border  text-sm ">
          {user?.given_name?.charAt(0).toUpperCase()}
          {user?.family_name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col text-right">
          <p className="font-semibold text-sm text-[#294664]">
            {user?.given_name}
          </p>
          <p className="text-xs text-gray-600">
            {isManager?.isGranted ? "Manager" : "Employee"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
