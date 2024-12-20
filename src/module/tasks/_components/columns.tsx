import { Column, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { CaretSortIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import TableActions from "@/shared/table/table-actions";
import { ROUTES } from "@/app/router/routes";
import { ITask } from "@/app/types/types";
import Status from "@/shared/cards/Status";
import Priority from "@/shared/cards/Priority";

export const columns: ColumnDef<ITask>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return <div className="text-start ">{row.original?.title}</div>;
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-start ">
          <a
            href={row.original?.image}
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-blue-600 cursor-pointer"
          >
            <img
              src={row.original?.image}
              className="w-12 h-12 rounded-md object-cover"
              alt=""
            />
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return <div className="text-start ">{row.original.description}</div>;
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-start ">{`${row.original.createdBy?.given_name} ${row.original.createdBy?.family_name}`}</div>
      );
    },
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned employees" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-start relative flex justify-center  w-full">
          {row.original.assignedTo && row.original.assignedTo.length > 0 ? (
            row.original.assignedTo.map((emp, index) => (
              <div
                key={emp.id}
                style={{
                  left: `${index * 20}px`,
                  zIndex: `{index}`,
                }}
                className="w-8 h-8 rounded-full text-white bg-[#294664] border border-black absolute flex justify-center items-center"
              >
                <p
                  className="text-xs font-medium cursor-default"
                  title={`${emp.given_name} ${emp.family_name}`}
                >{`${emp.given_name.charAt(0)}${emp.family_name.charAt(0)}`}</p>
              </div>
            ))
          ) : (
            <p className="italic text-gray-400">- No assigned employees -</p>
          )}{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader
        className=" flex justify-center"
        column={column}
        title="priority"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-start flex justify-center items-center gap-2 ">
          <Priority priority={row.original?.priority} />
        </div>
      );
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader
        className=" flex justify-center"
        column={column}
        title="state"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-start flex justify-center items-center gap-2">
          <Status state={row.original?.state} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      return (
        <TableActions
          module="tasks"
          navigator={ROUTES.EDIT_TASK}
          objectData={row.original}
        />
      );
    },
  },
];

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
