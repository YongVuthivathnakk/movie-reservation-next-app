"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AddRoomButton = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    capacity: 0,
    type: "",
  });

  const handleAddRooms = useMutation(api.rooms.addRooms);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleAddRooms({
        name: form.name,
        capacity: form.capacity,
        type: form.type as "standard" | "VIP" | "IMAX"
      });
      toast.success("Room have been added");
      setOpen(false);
    } catch (err) {
      console.error("Fail to add rooms: ", err);
      toast.error("Fail to add rooms");
    } finally {
      setForm({
        name: "",
        capacity: 0,
        type: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Room</Button>
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
              onValueChange={(value) => setForm((prev) => ({ ...prev, type: value }))}
            >
              <Label >Room Type</Label>

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
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
