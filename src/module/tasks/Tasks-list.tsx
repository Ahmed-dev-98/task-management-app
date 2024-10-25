import ApiLoader from "@/shared/ui/api-loader";
import { columns } from "./_components/columns";
import { useEffect, useState } from "react";
import { DataTableViewOptions } from "@/shared/table/coulmn-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export interface ITask {
  id: string;
  image: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  state: "todo" | "doing" | "done";
}
const TasksList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const tasks = useAppSelector(selectTasks);
  const { getUser } = useKindeAuth();
  const [tasksData, setTasksData] = useState<ITask[]>([]);
console.log(tasks);

  useEffect(() => {
    if (tasks) {
      const id = getUser()?.id;
      const filteredTasks = tasks.filter((task) => task.createdBy.id === id);
      setTasksData(filteredTasks);
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
        <p className="text-sm ">total tasks : {tasks?.length}</p>
        <DataTableViewOptions table={table} />{" "}
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
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
