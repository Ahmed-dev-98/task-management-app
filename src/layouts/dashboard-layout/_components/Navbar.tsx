import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Navbar = () => {
  const { getUser, getPermission } = useKindeAuth();
  const isManager = getPermission && getPermission("is-manager");

  return (
    <div className="w-full h-16 bg-[#fffffe] border-b-2  shadow-gray-300 p-2 flex justify-between  items-center">
      <div>
        <p>Dashboard</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-full bg-red-400 flex justify-center items-center font-semibold">
          {getUser()?.given_name?.charAt(0).toUpperCase()}
          {getUser()?.family_name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col ">
          <p className="font-medium text-sm">{getUser()?.given_name}</p>
          <p className="font-medium text-sm">
            {isManager?.isGranted ? "Manager" : "Employee"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
