import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetAllRooms } from "@/hooks/rooms/use-get-all-rooms"
import { useState } from "react"
import { ScreenIcon } from "./screen-icon"
import { ScrollArea } from "@/components/ui/scroll-area"

type Seat = {
    row: string;
    number: number;
    type: string;
    isBooked: boolean;
};

export const AddSeatsButton = () => {
    const [open, setOpen] = useState(false);
    const { rooms, isLoading } = useGetAllRooms();

    const [roomId, setRoomId] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [seats, setSeats] = useState<Seat[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            roomId,
            capacity,
            seats
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Seats</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[850px] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a Seats</DialogTitle>
                    <DialogDescription>
                        Create a number of seats
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex ">
                        <div className="flex-1/2 border-r pr-4">

                            <div className="grid gap-4 py-5 px-2 max-h-[50vh] overflow-y-auto">
                                <Select
                                    value={roomId ? `${roomId}|${capacity}` : undefined}
                                    onValueChange={(value) => {
                                        const [selectedRoomId, selectedCapacity] = value.split('|');
                                        setRoomId(selectedRoomId);
                                        const cap = Number(selectedCapacity);
                                        setCapacity(cap);
                                        // Auto-generate seats
                                        // Aim for max 10 seats per row for balance
                                        const maxSeatsPerRow = 10;
                                        const numRows = Math.ceil(cap / maxSeatsPerRow);
                                        const seatsPerRow = Math.ceil(cap / numRows);
                                        const seatArr = [];
                                        let seatCount = 0;
                                        for (let r = 0; r < numRows; r++) {
                                            const rowLabel = String.fromCharCode(65 + r); // 'A', 'B', ...
                                            for (let s = 1; s <= seatsPerRow && seatCount < cap; s++) {
                                                seatArr.push({
                                                    row: rowLabel,
                                                    number: s,
                                                    type: "standard",
                                                    isBooked: false,
                                                });
                                                seatCount++;
                                            }
                                        }
                                        setSeats(seatArr);
                                    }}
                                >
                                    <Label>Room Id</Label>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select room" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {rooms?.map((room) => (
                                                <SelectItem key={room._id.toString()} value={`${room._id}|${room.capacity}`}>
                                                    {room.name} - {room.capacity} seats
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className="grid gap-3">
                                    <Label>Capacity</Label>
                                    <div className="border p-1 text-center text-sm rounded-lg w-15 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                                        {capacity || 0}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1/2 px-4">
                            <Label className="mb-4">Preview</Label>
                            <ScrollArea className="h-[50vh] rounded-md border p-4">
                                {seats.length === 0 ? (
                                    <div className="text-muted-foreground">Select a room to preview seats</div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                        {/* Screen triangle */}
                                        <ScreenIcon />
                                        {/* Seat rows */}
                                        <div className="flex flex-col gap-2 w-full items-center">
                                            {Array.from(new Set(seats.map(seat => seat.row))).map(rowLabel => (
                                                <div key={rowLabel} className="flex gap-2 items-center justify-center">
                                                    <span className="font-semi-bold w-4 text-center">{rowLabel}</span>
                                                    {seats.filter(seat => seat.row === rowLabel).map((seat, idx) => (
                                                        <button
                                                            type="button"
                                                            key={rowLabel + seat.number}
                                                            className={`w-8 h-8 flex items-center justify-center rounded border text-xs transition-colors
                                      ${seat.type === "VIP" ? "bg-yellow-300 border-yellow-500" : "bg-gray-200 border-gray-400"}
                                      `}
                                                            title={`Row ${seat.row} Seat ${seat.number}`}
                                                            onClick={() => {
                                                                const newSeats = [...seats];
                                                                // Toggle between standard and VIP for demo
                                                                newSeats.find((s) => s.row === seat.row && s.number === seat.number)!.type = seat.type === "standard" ? "VIP" : "standard";
                                                                setSeats(newSeats);
                                                            }}
                                                        >
                                                            {seat.number}
                                                        </button>
                                                    ))}
                                                    <span className="font-semi-bold w-4 text-center">{rowLabel}</span>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ScrollArea>
                        </div>
                    </div>

                    <DialogFooter className="pt-5">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}