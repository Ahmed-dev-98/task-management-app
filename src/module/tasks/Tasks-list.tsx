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
  const tasksData: ITask[] = [
    {
      id: "1",
      image: "https://via.placeholder.com/150",
      title: "Design Login Page",
      description: "Create a user-friendly login page layout.",
      priority: "high",
      state: "todo",
    },
    {
      id: "2",
      image: "https://via.placeholder.com/150",
      title: "Setup Database",
      description: "Set up the initial database schema.",
      priority: "high",
      state: "doing",
    },
    {
      id: "3",
      image: "https://via.placeholder.com/150",
      title: "Write Documentation",
      description: "Document all API endpoints and usage.",
      priority: "medium",
      state: "todo",
    },
    {
      id: "4",
      image: "https://via.placeholder.com/150",
      title: "Implement Authentication",
      description: "Add JWT authentication for the app.",
      priority: "high",
      state: "doing",
    },
    {
      id: "5",
      image: "https://via.placeholder.com/150",
      title: "Design Landing Page",
      description: "Design a responsive landing page.",
      priority: "medium",
      state: "todo",
    },
    {
      id: "6",
      image: "https://via.placeholder.com/150",
      title: "Optimize Images",
      description: "Compress and optimize images for faster load.",
      priority: "low",
      state: "done",
    },
    {
      id: "7",
      image: "https://via.placeholder.com/150",
      title: "Implement Search Feature",
      description: "Add search functionality to the app.",
      priority: "high",
      state: "doing",
    },
    {
      id: "8",
      image: "https://via.placeholder.com/150",
      title: "Add Analytics",
      description: "Integrate Google Analytics.",
      priority: "medium",
      state: "todo",
    },
    {
      id: "9",
      image: "https://via.placeholder.com/150",
      title: "Fix Mobile Layout Issues",
      description: "Resolve styling issues on mobile.",
      priority: "high",
      state: "todo",
    },
    {
      id: "10",
      image: "https://via.placeholder.com/150",
      title: "Add Notification System",
      description: "Implement a system for push notifications.",
      priority: "medium",
      state: "doing",
    },
    {
      id: "11",
      image: "https://via.placeholder.com/150",
      title: "Code Review",
      description: "Review and refactor old code.",
      priority: "low",
      state: "done",
    },
    {
      id: "12",
      image: "https://via.placeholder.com/150",
      title: "Implement Dark Mode",
      description: "Add dark mode toggle to the app.",
      priority: "medium",
      state: "todo",
    },
    {
      id: "13",
      image: "https://via.placeholder.com/150",
      title: "Optimize API Calls",
      description: "Reduce and optimize API call frequency.",
      priority: "high",
      state: "doing",
    },
    {
      id: "14",
      image: "https://via.placeholder.com/150",
      title: "Create Test Cases",
      description: "Write test cases for all modules.",
      priority: "medium",
      state: "done",
    },
    {
      id: "15",
      image: "https://via.placeholder.com/150",
      title: "Integrate OAuth",
      description: "Enable Google OAuth for easy sign-in.",
      priority: "high",
      state: "todo",
    },
    {
      id: "16",
      image: "https://via.placeholder.com/150",
      title: "Design 404 Page",
      description: "Add a custom 404 error page.",
      priority: "low",
      state: "done",
    },
    {
      id: "17",
      image: "https://via.placeholder.com/150",
      title: "Setup Caching",
      description: "Add caching mechanism for improved speed.",
      priority: "medium",
      state: "doing",
    },
    {
      id: "18",
      image: "https://via.placeholder.com/150",
      title: "Create FAQ Section",
      description: "Develop an FAQ page for common issues.",
      priority: "low",
      state: "todo",
    },
    {
      id: "19",
      image: "https://via.placeholder.com/150",
      title: "UI Testing",
      description: "Perform UI tests on all major devices.",
      priority: "high",
      state: "doing",
    },
    {
      id: "20",
      image: "https://via.placeholder.com/150",
      title: "Add Accessibility Features",
      description: "Enhance app accessibility for screen readers.",
      priority: "medium",
      state: "done",
    },
  ];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="w-full mx-auto flex justify-start items-start h-full flex-col gap-5  ">
      <div className="flex items-center gap-4 w-[95%] h-[40px]">
        <DataTableViewOptions table={table} />{" "}
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
        // onClick={() => {
        //   navigate(ROUTES.CREATE_PLAN);
        // }}
        >
          Add Task
        </Button>
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
