import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  searchBy: string;
  setSearchBy: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTableSearch<TData>({
  table,
  searchBy,
  setSearchBy,
}: DataTableViewOptionsProps<TData>) {
  const forbiddenSearchBy = [
    "actions",
    "picture",
    "tasks",
    "image",
    "assignedTo",
    "createdBy",
  ];
  return (
    <div className="flex gap-3 items-center">
      <Input
        placeholder={`Filter ${searchBy}s...`}
        value={(table.getColumn(searchBy)?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          table.getColumn(searchBy)?.setFilterValue(event.target.value);
        }}
        className="max-w-sm"
      />{" "}
      <Select onValueChange={(e) => setSearchBy(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {table.getAllColumns().map((col) => {
              if (!forbiddenSearchBy.includes(col.id)) {
                return (
                  <SelectItem key={col.id} value={col.id}>
                    {col.id}
                  </SelectItem>
                );
              }
            })}
          </SelectGroup>
        </SelectContent>
      </Select>{" "}
    </div>
  );
}
