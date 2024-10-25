import Loggin from "@/module/auth/Loggin";
import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import DashboardLayout from "@/layouts/dashboard-layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/module/auth/LandingPage";
import Analytics from "@/module/analytics/Analytics";
import { ROUTES } from "./routes";
import Tasks from "@/module/tasks/Tasks";
import Profile from "@/module/profile/Profile";

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <AuthLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: ROUTES.Auth,
        element: <Loggin />,
      },
    ],
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Analytics /> },
      { path: ROUTES.ANALYTICS, element: <Analytics /> },
      { path: ROUTES.TASKS, element: <Tasks /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
    ],
  },
]);

export default router;
