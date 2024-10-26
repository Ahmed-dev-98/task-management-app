/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiLoader from "@/shared/ui/api-loader";
import { columns } from "./_components/columns";
import { useEffect, useState } from "react";
import { DataTableViewOptions } from "@/shared/table/coulmn-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import CustomTable from "@/shared/table/custom-table";
import { DataTablePagination } from "@/shared/table/Pagination";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { useAppSelector } from "@/store";
import { selectTasks } from "@/store/slices/tasks.slice";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { ITask } from "@/app/types/types";

const TasksList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const tasks = useAppSelector(selectTasks);
  const [searchState, setSearchState] = useState<
    "state" | "priority" | "title"
  >("title");
  const { getPermission } = useKindeAuth();
  const [tasksData, setTasksData] = useState<ITask[]>([]);

  useEffect(() => {
    if (tasks && getPermission && !getPermission("is-manager").isGranted) {
      // const filteredTasks = tasks.filter((task) => task.createdBy.id === id);
      setTasksData(tasks);
      setIsLoading(false);
    } else {
      setTasksData(tasks);
      setIsLoading(false);
    }
  }, [tasks]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const navigate = useNavigate();
  const table = useReactTable({
    data: tasksData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full mx-auto flex justify-start items-start h-full flex-col gap-5  ">
      <div className="flex items-center gap-4 w-[95%] h-[40px]">
        <p className="text-sm ">total tasks : {tasksData?.length}</p>
        <DataTableViewOptions table={table} />{" "}
        <DropdownMenu>
          <DropdownMenuTrigger className="h-full" asChild>
            <Button
              variant="outline"
              size="sm"
              className=" hidden h-full lg:flex w-fit"
            >
              <MixerHorizontalIcon className="mx-2 h-4 w-4" />
              select filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[50px]">
            <DropdownMenuSeparator />
            {["title", "state", "priority"].map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  onClick={() => setSearchState(column as 'state' | 'priority' | 'title')}
                  key={column}
                  className="capitalize"
                  checked={searchState === column}
                >
                  {column}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          placeholder={`Filter ${searchState}...`}
          value={
            (table.getColumn(searchState)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchState)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={() => navigate(ROUTES.CREATE_TASK)}>Add Task</Button>
      </div>
      <div className="min-h-[500px] bg-slate-50  w-full overflow-y-scroll">
        {!isLoading ? (
          <>
            <CustomTable columns={columns} table={table} />
          </>
        ) : (
          <ApiLoader />
        )}
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default TasksList;
