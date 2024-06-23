"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./FacetedFilter";
import { priorities, statuses } from "@/assets";
import { DataTableViewOptions } from "./ViewOptions";
import AddToDoForm from "../AddToDoForm";
import { IGetUser } from "@/lib/types/user";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  user: IGetUser;
}

export function DataTableToolbar<TData>({
  table,
  user,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <nav className="group flex h-full w-full flex-col gap-4 p-3">
      <AddToDoForm user={user} />

      <Input
        placeholder="Filter tasks..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="h-10 w-full rounded-s-sm ring-1 ring-primary"
      />

      <DataTableViewOptions table={table} />

      {table.getColumn("status") && (
        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={statuses}
        />
      )}
      {table.getColumn("priority") && (
        <DataTableFacetedFilter
          column={table.getColumn("priority")}
          title="Priority"
          options={priorities}
        />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-10 border border-primary px-2 hover:bg-primary lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </nav>
  );
}
