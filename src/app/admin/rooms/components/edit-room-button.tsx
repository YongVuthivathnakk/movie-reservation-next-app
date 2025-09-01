import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Id } from "../../../../../convex/_generated/dataModel";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pen } from "lucide-react";

interface EditRoomButtonProps {
  data: {
    _id: Id<"rooms">;
    _creationTime: number;
    name: string;
    capacity: number;
    type: string;
  };
}

export const EditRoomButton = ({ data }: EditRoomButtonProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    _id: data._id,
    name: data.name,
    capacity: data.capacity,
    type: data.type,
  });

  const editRoom = useMutation(api.rooms.editRoom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "_id" ?  (value as Id<"rooms">) : value,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editRoom({
        _id: form._id,
        name: form.name,
        capacity: form.capacity,
        type: form.type as "standard" | "VIP" | "IMAX",
      });
      toast.success("Room have been edited");
      setOpen(false);
    } catch (err) {
      console.error("Fail to edit room: ", err);
      console.log(form);
      toast.error("Fail to edit rooom");
    } finally {
      setForm({
        _id: data._id,
        name: data.name,
        capacity: data.capacity,
        type: data.type,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full font-normal flex justify-start">
        <Pen />
        Edit room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Room</DialogTitle>
          <DialogDescription>
            Creating a room for storing seats
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-5 px-2 max-h-[50vh] overflow-y-auto">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                required
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Theatre 1"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                required
                id="capacity"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                type="number"
              />
            </div>

            <Select
              value={form.type}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a room type </SelectLabel>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="IMAX">IMAX</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="pt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Edit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
