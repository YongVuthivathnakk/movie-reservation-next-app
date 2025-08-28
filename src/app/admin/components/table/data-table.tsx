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
import { ChevronDown } from "lucide-react";
import { DeleteButton } from "../delete-button";
import { Id } from "../../../../../convex/_generated/dataModel";
import { FunctionReference } from "convex/server";
import { ReactMutation } from "convex/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: React.ReactNode;
  handleDelete: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      { ids: Id<"movies">[] },
      null,
      string | undefined
    >
  >;
  isDone: boolean;
  loadMore: (numItems: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  children,
  handleDelete,
  isDone,
  loadMore,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilter] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const selectRowIds = useMemo(() => Object.keys(rowSelection), [rowSelection]);

  const [page, setPage] = React.useState(0);
  const [maxPage, setMaxPage] = React.useState(0);

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
      columns[columns.length - 1].toggleVisibility(false);
    }
  }, [table]);

  const deleteOnId = async () => {
    const selectRows = table
      .getSelectedRowModel()
      .rows.map((row) => (row.original as any)._id) as Id<"movies">[];

    await handleDelete({ ids: selectRows });
    table.resetRowSelection();
  };

  return (
    <div>
      <div className="flex justify-between py-4 w-full">
        <div className="flex gap-4">
          <Input
            placeholder="Filter title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
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
        <Table >
          <TableHeader >
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
          <TableBody >
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
                  No results.
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
            onClick={() => {
              if (page > 1) {
                setPage((prev) => prev - 1);
                table.previousPage();
              }
            }}
            disabled={page === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (page >= maxPage) {
                // load new data before advancing
                setMaxPage((prev) => prev + 1);
                loadMore(10);
                console.log("load")
              }
              setPage((prev) => prev + 1);
              table.nextPage();
            }}
            disabled={ !table.getCanNextPage() && isDone }
          >
            Next
          </Button>
        </div>
        <div>Page: {page}</div>
        <div>Max Page: {maxPage}</div>

      </div>
    </div>
  );
}
