import { ROUTES } from "@/app/router/routes";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  element,
  module,
}: {
  element: JSX.Element;
  module: "tasks" | "employees";
}) => {
  const { getPermission } = useKindeAuth();
  const location = useLocation();

  if (
    getPermission &&
    !getPermission("is-manager").isGranted &&
    module === "employees"
  ) {
    toast.error("You don't have permission to access this page");
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  } else if (module === "tasks" && !location.state) {
    toast.error("You don't have permission to access this page");
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  } else {
    return element;
  }
};

export default ProtectedRoute;
