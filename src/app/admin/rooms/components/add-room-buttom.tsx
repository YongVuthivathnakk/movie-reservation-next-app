"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "convex/react";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

export const AddRoomButton = () => {

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
  });

  const handleAddRooms = useMutation(api.rooms.addRooms);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      handleAddRooms(form);
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
          <DialogTitle>Add a Movie</DialogTitle>
          <DialogDescription>
            Add an upcoming movie to your system
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-5 px-2 max-h-[50vh] overflow-y-auto">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                required
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="How To Train Your Dragon"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                placeholder="Type your description here."
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                required
                id="duration"
                min={0}
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                placeholder="Action"
              />
            </div>
            <div className="grid gap-3">
              <Dialog open={popoverOpen} onOpenChange={setPopoverOpen}>
                <DialogTitle>
                  <Label htmlFor="date" className="px-1">
                    Release Date
                  </Label>
                </DialogTitle>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    {date ? date.toLocaleDateString() : "Select Release Date"}
                  </Button>
                </DialogTrigger>
                <DialogContent showCloseButton={false} className="w-auto p-0 overflow-hidden">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(d) => {
                      setDate(d);
                      setPopoverOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="classification">Classsification</Label>
              <Input
                required
                id="classification"
                name="classification"
                value={form.classification}
                onChange={handleChange}
                placeholder="NC15"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="posterUrl">Poster URL</Label>
              <Input
                required
                id="posterUrl"
                name="posterUrl"
                value={form.posterUrl}
                onChange={handleChange}
                placeholder="http://..."
              />
            </div>

            <p className="text-sm font-semibold">Pricing:</p>
            <div className="pl-2 grid gap-3">
              <Label htmlFor="standardPricing">Standard</Label>
              <div className="flex gap-3 items-center justify-center">
                <Input
                  required
                  id="standardPricing"
                  min={0}
                  type="number"
                  name="standardPricing"
                  value={form.standardPricing}
                  onChange={handleChange}
                />
                <p>$</p>
              </div>

              <Label htmlFor="vipPricing">VIP</Label>
              <div className="flex justify-center items-center gap-3">
                <Input
                  required
                  id="vipPricing"
                  min={0}
                  type="number"
                  name="vipPricing"
                  value={form.vipPricing}
                  onChange={handleChange}
                />
                <p>$</p>
              </div>
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