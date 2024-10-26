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
import EmployeesLayout from "@/module/employees/employees-layout";
import EmployeesList from "@/module/employees/employees-list";
import EmployeeManager from "@/module/employees/_components/employee-crud";
import ProtectedRoute from "@/layouts/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <AuthLayout />,
    children: [{ index: true, element: <LandingPage /> }],
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
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute module="tasks" element={<TaskManager />} />
            ),
          },
        ],
      },
      {
        path: ROUTES.EMPLOYEES,
        element: <EmployeesLayout />,
        children: [
          { index: true, element: <EmployeesList /> },
          {
            path: "create",
            element: (
              <ProtectedRoute
                module="employees"
                element={<EmployeeManager />}
              />
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute
                module="employees"
                element={<EmployeeManager />}
              />
            ),
          },
        ],
      },
      { path: ROUTES.PROFILE, element: <Profile /> },
    ],
  },
]);

export default router;
