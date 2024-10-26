import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import CustomTable from "@/shared/table/custom-table";
import { DataTableViewOptions } from "./coulmn-toggle";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./Pagination";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
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
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-4 w-[95%]   h-[40px]">
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
          Add Plan
        </Button>
      </div>
      {<CustomTable columns={columns} table={table} />}
      <DataTablePagination table={table} />
    </div>
  );
}
