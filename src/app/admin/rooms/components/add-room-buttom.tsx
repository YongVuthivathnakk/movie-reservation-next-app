"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export const AddRoomButton = () => {

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
  });

  const handleAddRooms = useMutation(api.rooms.addRooms);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...form,
      [name]: value,

    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleAddRooms(form);
      toast.success("Room have been added");
      setOpen(false);
    } catch (err) {
      console.error("Fail to add rooms: ", err);
      toast.error("Fail to add rooms");
    } finally {
      setForm({
        name: "",
        type: "",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Movie</Button>
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
                placeholder="Theare 1"
              />
            </div>


            <div className="grid gap-3">
              <Label htmlFor="type">Room Type</Label>
              <Input
                required
                id="type"
                min={0}
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="IMAX"
              />
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
  )
}