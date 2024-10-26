import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ITask } from "@/module/tasks/Tasks-list";
import { useAppDispatch } from "@/store";
import { deleteTaskAction } from "@/store/slices/tasks.slice";
import {
  deleteEmployeeAction,
  IEmployee,
} from "@/store/slices/employees.slice";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import toast from "react-hot-toast";

const TableActions = ({
  objectData,
  navigator,
  module,
}: {
  objectData: ITask | IEmployee;
  navigator: ROUTES;
  module: "tasks" | "employees";
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getPermission, user } = useKindeAuth();
  const handleDelete = () => {
    if (module === "employees") {
      if (getPermission("is-manager").isGranted) {
        dispatch(deleteEmployeeAction(objectData.id));
        toast.success("employee deleted successfully");
      } else {
        toast.error("You don't have permission to delete employees");
      }
    } else if (module === "tasks") {
      if (
        user?.id === objectData.createdBy.id ||
        getPermission("is-manager").isGranted
      ) {
        dispatch(deleteTaskAction(objectData.id));
        toast.success("Task deleted successfully");
      } else {
        toast.error("only the creator can delete tasks");
      }
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <div
            onClick={() => {
              navigate(`${navigator.replace(":id", objectData.id)}`, {
                state: objectData,
              });
            }}
            className="flex items-center justify-between space-x-2 w-full px-3 "
          >
            <p>Edit</p>
            <Edit size={16} />{" "}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <div className="flex items-center justify-between space-x-2 w-full px-3 ">
            <Button
              onClick={() => {
                handleDelete();
              }}
              variant="destructive"
            >
              Delete
            </Button>

            <Trash2 size={16} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <div className="flex items-center justify-between space-x-2 w-full px-3 ">
            <p>View</p>
            <Edit size={16} />{" "}
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
