import { columns } from "./_components/columns";
import { useEffect, useState } from "react";

import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { useAppSelector } from "@/store";
import { selectTasks } from "@/store/slices/tasks.slice";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { ITask } from "@/app/types/types";
import TableContainer from "@/shared/table/table-container";

const TasksList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const tasks = useAppSelector(selectTasks);
  const [searchBy, setSearchBy] = useState("title");
  const { getPermission } = useKindeAuth();
  const [tasksData, setTasksData] = useState<ITask[]>([]);

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
  useEffect(() => {
    if (tasks && getPermission && !getPermission("is-manager").isGranted) {
      setTasksData(tasks);
      setIsLoading(false);
    } else {
      setTasksData(tasks);
      setIsLoading(false);
    }
  }, [tasks]);

  return (
    <TableContainer
      searchBy={searchBy}
      setSearchBy={setSearchBy}
      addButtonText="Add Task"
      columns={columns}
      table={table}
      isLoading={isLoading}
      data={tasksData}
      onClick={() => navigate(ROUTES.CREATE_TASK)}
    />
  );
};

export default TasksList;
