"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";

export type Movie = {
  _id: Id<"movies">;
  _creationTime: number;
  description?: string | undefined;
  posterUrl?: string | undefined;
  title: string;
  genre: string;
  duration: number;
  pricing: Record<string, number>;
  releaseDate?: string | undefined;
  classification: string;
};

export const columns: ColumnDef<Movie>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "_id",
    header: "_id",
    cell: ({ row }) => {
      return (
        <div className="max-w-[150px] truncate" title={row.original._id}>
          {row.original._id ?? "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div
          className="max-w-[150px] truncate"
          title={row.original.description}
        >
          {row.original.description ?? "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "posterUrl",
    header: "Poster URL",
    cell: ({ row }) => {
      return (
        <div className="max-w-[150px] truncate" title={row.original.posterUrl}>
          {row.original.posterUrl ?? "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "pricing",
    header: "Pricing",
    cell: ({ row }) => {
      const pricing = row.original.pricing;
      return `Standard: $${pricing.standard}, VIP: $${pricing.VIP}`;
    },
  },
  {
    accessorKey: "releaseDate",
    header: "Release Date",
  },
  {
    accessorKey: "classification",
    header: "Classification",
  },
  {
    accessorKey: "_creationTime",
    header: "_creationTime",
    cell: ({ row }) => {
      const date = row.original._creationTime;
      return new Date(date).toLocaleString();
    },
  },
];
