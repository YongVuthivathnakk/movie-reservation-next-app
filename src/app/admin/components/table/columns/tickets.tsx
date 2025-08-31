import { ColumnDef } from "@tanstack/react-table";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export type Ticket = {
  _id: Id<"tickets">;
  _creationTime: number;
  seatId: Id<"seats">;
  bookingId: Id<"bookings">;
  userId: Id<"users">;
  pricePaid: number;
};


export const columns: ColumnDef<Ticket>[] = [
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
        accessorKey: "userId",
    header: "User_Id",
  },
  {
    accessorKey: "seatId",
    header: "Seat_Id",
  },
  {
    accessorKey: "bookingId",
    header: "Booking_Id",
  },

  {
    accessorKey: "pricePaid",
    header: "Price_Paid"
  },
    {
    accessorKey: "_creationTime",
    header: "_creationTime",
    cell: ({ row }) => {
      const date = new Date(row.original._creationTime);
      return date.toLocaleString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const movie = row.original;

      const handleCopyId = () => {
        try {
           navigator.clipboard.writeText(movie._id);
           toast.success("Copied ID to clipboard");
        } catch (err) {
          console.error("Error copy ID: ", err );
          toast.error("Fail to copy text")
        }
      }
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
            <DropdownMenuItem
              onClick={handleCopyId}
            >
              Copy ticket ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
];
