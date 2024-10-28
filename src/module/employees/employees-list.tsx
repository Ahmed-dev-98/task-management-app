import { useState } from "react";
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
import { selectEmployees } from "@/store/slices/employees.slice";
import { columns } from "./_components/columns";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import toast from "react-hot-toast";
import TableContainer from "@/shared/table/table-container";

const EmployeesList = () => {
  const [isLoading] = useState(false);
  const employees = useAppSelector(selectEmployees);
  const [searchBy, setSearchBy] = useState("given_name");
  const { getPermission } = useKindeAuth();
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
    <TableContainer
      searchBy={searchBy}
      setSearchBy={setSearchBy}
      addButtonText="Add Employee"
      columns={columns}
      table={table}
      isLoading={isLoading}
      data={employees}
      onClick={() => {
        if (getPermission && getPermission("is-manager").isGranted) {
          navigate(ROUTES.CREATE_EMPLOYEE);
        } else {
          toast.error("You don't have permission to add employees");
        }
      }}
    />
  );
};

export default EmployeesList;
