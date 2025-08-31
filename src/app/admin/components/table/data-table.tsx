"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  useReactTable,
  getFilteredRowModel,
  ColumnFilter,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { DeleteButton } from "../delete-button";
import { Id } from "../../../../../convex/_generated/dataModel";
import { FunctionReference } from "convex/server";
import { ReactMutation } from "convex/react";

interface DataTableProps<TData, TValue, TTable extends "movies" | "rooms" | "seats" | "bookings" | "tickets" | "showtimes"> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  idType: TTable;
  children: React.ReactNode;
  handleDelete: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      { ids: Id<TTable>[] },
      null,
      string | undefined
    >
  >;
}

export function DataTable<TData, TValue, TTable extends "movies" | "rooms" | "seats" | "bookings" | "tickets" | "showtimes">({
  columns,
  data,
  children,
  handleDelete,
  idType,
}: // isDone,
// loadMore,
DataTableProps<TData, TValue, TTable>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilter] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const selectRowIds = useMemo(() => Object.keys(rowSelection), [rowSelection]);

  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      rowSelection,
      columnFilters,
      columnVisibility,
    },
  });

  useEffect(() => {
    const columns = table.getAllColumns();
    if (columns.length > 0) {
      columns[1].toggleVisibility(false);
      columns[columns.length - 2].toggleVisibility(false);
    }
  }, [table]);

  const deleteOnId = async () => {
    const selectRows = table
      .getSelectedRowModel()
      .rows.map((row) => (row.original as any)._id) as Id<typeof idType>[];
      await handleDelete({ ids: selectRows });
    table.resetRowSelection();
  };

  const filterMap: Record<string, { column: string; placeholder: string }> = {
    movies: { column: "title", placeholder: "Filter title..." },
    rooms: { column: "name", placeholder: "Filter name..." },
    seats: { column: "roomId", placeholder: "Filter room ID..." },
    bookings: { column: "userId", placeholder: "Filter user ID..." },
    tickets: { column: "userId", placeholder: "Filter user ID..." },
    showtimes: { column: "movieId", placeholder: "Filter movie ID..." },
  };

  const config = filterMap[idType];

  return (
    <div>
      <div className="flex justify-between py-4 w-full">
        <div className="flex gap-4">
          {config ? (
            <Input
              placeholder={config.placeholder}
              value={
                (table.getColumn(config.column)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table.getColumn(config.column)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4">
          {children}
          {selectRowIds.length > 0 && (
            <DeleteButton handleDelete={deleteOnId} />
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 bg-background shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
