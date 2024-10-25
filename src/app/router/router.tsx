import Loggin from "@/module/auth/Loggin";
import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import DashboardLayout from "@/layouts/dashboard-layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/module/auth/LandingPage";
import Analytics from "@/module/analytics/Analytics";
import { ROUTES } from "./routes";
import Tasks from "@/module/tasks/Tasks-list";
import Profile from "@/module/profile/Profile";
import TaskManager from "@/module/tasks/_components/tasks-crud";
import TasksLayout from "@/module/tasks/tasks-layout";

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <AuthLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: ROUTES.AUTH, element: <Loggin /> },
    ],
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Analytics /> },
      {
        path: ROUTES.TASKS,
        element: <TasksLayout />,
        children: [
          { index: true, element: <Tasks /> },
          { path: "create", element: <TaskManager /> },
          { path: "edit/:id", element: <TaskManager /> },
        ],
      },
      { path: ROUTES.PROFILE, element: <Profile /> },
    ],
  },
]);

export default router;
