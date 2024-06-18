"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./FacetedFilter";
import { priorities, statuses } from "@/assets";
import { DataTableViewOptions } from "./ViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="group flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2">
        <div className="flex flex-col items-center justify-between">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
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
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
          <DataTableViewOptions table={table} />
        </div>
      </nav>
    </div>
  );
}
