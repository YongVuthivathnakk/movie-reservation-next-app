import { ColumnDef } from "@tanstack/react-table";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export type Seat = {
    _id: Id<"seats">;
    _creationTime: number;
    number: number;
    roomId: Id<"rooms">;
    seatType: "normal" | "VIP";
    row: string;
};

export const columns: ColumnDef<Seat>[] = [
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
        accessorKey: "number",
        header: "Number",
    },
    {
        accessorKey: "roomId",
        header: "Room_Id",
    },
    {
        accessorKey: "seatType",
        header: "Seat_Type",
    },
    {
        accessorKey: "row",
        header: "Row",
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
                    console.error("Error copy ID: ", err);
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
                            Copy seat ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]