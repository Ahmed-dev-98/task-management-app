/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import CustomTable from "./custom-table";
import ApiLoader from "../ui/api-loader";
import { ColumnDef, Table } from "@tanstack/react-table";
import { DataTableSearch } from "./coulmn-search";
import { DataTableViewOptions } from "./coulmn-toggle";
import { DataTablePagination } from "./Pagination";

const TableContainer = ({
  data,
  table,
  columns,
  isLoading,
  searchBy,
  setSearchBy,
  addButtonText,
  onClick,
}: {
  data: any;
  table: Table<any>;
  columns: ColumnDef<any>[];
  isLoading: boolean;
  searchBy: string;
  addButtonText: string;
  onClick: () => void;
  setSearchBy: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full mx-auto flex flex-col gap-5 justify-start items-center h-screen ">
      <div className="flex items-center  justify-between gap-4 w-full ">
        <div className="flex h-10 gap-3">
          <DataTableViewOptions table={table} />{" "}
          <DataTableSearch
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            table={table}
          />{" "}
        </div>
        <Button onClick={onClick}>{addButtonText}</Button>
      </div>
      <div className="h-[500px] w-full overflow-y-scroll">
        {!isLoading && data ? (
          <CustomTable columns={columns} table={table} />
        ) : (
          <ApiLoader />
        )}
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default TableContainer;
