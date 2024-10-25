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
import MainAlert from "../ui/main-alert";

const TableActions = ({ id }: { id: string }) => {
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
            // onClick={() => navigate(`${ROUTES.EDIT_PLAN.replace(":id", id)}`)}
            className="flex items-center justify-between space-x-2 w-full px-3 "
          >
            <p>Edit</p>
            <Edit size={16} />{" "}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <div className="flex items-center justify-between space-x-2 w-full px-3 ">
            <p>
              <MainAlert
                buttonComponent={<Button variant="destructive">Delete</Button>}
                id={id}
                description="This action cannot be undone. This will permanently delete your  account and remove your data from our servers."
                handler={(e) => {
                  console.log(e);
                }}
              />
            </p>
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
