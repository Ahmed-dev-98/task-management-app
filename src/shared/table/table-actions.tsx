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
import { useAppDispatch } from "@/store";
import { deleteTaskAction } from "@/store/slices/tasks.slice";
import { deleteEmployeeAction } from "@/store/slices/employees.slice";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import toast from "react-hot-toast";
import { IEmployee, ITask } from "@/app/types/types";

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
      if (getPermission && getPermission("is-manager").isGranted) {
        dispatch(deleteEmployeeAction(objectData.id));
        toast.success("employee deleted successfully");
      } else {
        toast.error("You don't have permission to delete employees");
      }
    } else if (module === "tasks") {
      const data = objectData as ITask;
      if (
        user?.id === data?.createdBy?.id ||
        (getPermission && getPermission("is-manager").isGranted)
      ) {
        dispatch(deleteTaskAction(data.id));
        toast.success("Task deleted successfully");
      } else {
        toast.error("only the owner or a manager can delete tasks");
      }
    }
  };

  const handleEdit = () => {
    if (module === "tasks") {
      const data = objectData as ITask;
      if (
        user?.id === data?.createdBy?.id ||
        (getPermission && getPermission("is-manager").isGranted)
      ) {
        navigate(`${navigator.replace(":id", objectData.id)}`, {
          state: objectData,
        });
      } else {
        toast.error("only the owner or a manager can edit tasks");
      }
    } else if (module === "employees") {
      if (getPermission && getPermission("is-manager").isGranted) {
        navigate(`${navigator.replace(":id", objectData.id)}`, {
          state: objectData,
        });
      } else {
        toast.error("You don't have permission to edit employees");
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
            onClick={() => handleEdit()}
            className="flex items-center justify-between w-full"
          >
            <p>Edit</p>
            <Edit size={16} />{" "}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <div
            onClick={() => {
              handleDelete();
            }}
            className="flex items-center justify-between  w-full  "
          >
            <p className="text-xs">Delete</p>

            <Trash2 size={16} />
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
