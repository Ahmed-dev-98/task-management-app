import ApiLoader from "@/shared/ui/api-loader";
import { useState } from "react";
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
import { selectEmployees } from "@/store/slices/employees.slice";
import { columns } from "./_components/columns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

const EmployeesList = () => {
  const [isLoading] = useState(false);
  const employees = useAppSelector(selectEmployees);
  const [searchState, setSearchState] = useState<"name" | "email">("name");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const navigate = useNavigate();
  const table = useReactTable({
    data: employees,
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
        <p className="text-sm ">total employees : {employees?.length}</p>
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
            {["name", "email"].map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  onClick={() => setSearchState(column as "email" | "name")}
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
        <Button onClick={() => navigate(ROUTES.CREATE_EMPLOYEE)}>
          Add Employee
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

export default EmployeesList;
