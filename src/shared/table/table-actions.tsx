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

const TableActions = ({
  task,
  navigator,
}: {
  task: ITask;
  navigator: ROUTES;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
            onClick={() =>
              navigate(`${navigator.replace(":id", task.id)}`, { state: task })
            }
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
              onClick={() => dispatch(deleteTaskAction(task.id))}
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
