import { ColumnDef } from "@tanstack/react-table";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { EditRoomButton } from "@/app/admin/rooms/components/edit-room-button";

export type Room = {
  _id: Id<"rooms">;
  _creationTime: number;
  name: string;
  capacity: number;
  type: string;
};

export const columns: ColumnDef<Room>[] = [
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
  },
  {
    accessorKey: "name",
    header: "Name",
  },
    {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "type",
    header: "Type",
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
          
          const room = row.original;
    
          const handleCopyId = () => {
            try {
               navigator.clipboard.writeText(room._id);
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
                </ Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={handleCopyId}
                >
                  Copy room ID
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                  <EditRoomButton data={room} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
  },
];
