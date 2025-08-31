import { ColumnDef } from "@tanstack/react-table";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export type Showtime = {
  _id: Id<"showtimes">;
  _creationTime: number;
  endTime?: number | undefined;
  roomId: Id<"rooms">;
  movieId: Id<"movies">;
  startTime: number;
};

export const columns: ColumnDef<Showtime>[] = [
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
    accessorKey: "startTime",
    header: "Start-Time",
    cell: ({ row }) => {
      const date = new Date(row.original._creationTime).toLocaleString();
      return date;
    },
  },
  {
    accessorKey: "endTime",
    header: "End-Time",
    cell: ({ row }) => {
      const date = new Date(row.original._creationTime).toLocaleString();
      return date;
    },
  },

  {
    accessorKey: "roomId",
    header: "Room-Id",
  },

  {
    accessorKey: "movieId",
    header: "Movie-Id",
  },

  {
    accessorKey: "_creationTime",
    header: "_creationTime",
    cell: ({ row }) => {
      const date = new Date(row.original._creationTime).toLocaleString();
      return date;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const showtime = row.original;

      const handleCopyId = () => {
        try {
          navigator.clipboard.writeText(showtime._id);
          toast.success("Copied ID to clipboard");
        } catch (err) {
          console.error("Error copy ID: ", err);
          toast.error("Fail to copy text");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCopyId}>
              Copy showtime ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
