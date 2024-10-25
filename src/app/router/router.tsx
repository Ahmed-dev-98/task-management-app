import Loggin from "@/module/auth/Loggin";
import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import DashboardLayout from "@/layouts/dashboard-layout/DashboardLayout";
import Tasks from "@/module/tasks/Tasks";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/module/auth/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "auth",
        element: <Loggin />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [{ index: true, element: <Tasks /> }],
  },
]);

export default router;
