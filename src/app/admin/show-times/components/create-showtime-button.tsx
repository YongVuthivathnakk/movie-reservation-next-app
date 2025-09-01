import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const CreateShowtimeButton = () => {




  // _id: Id<"showtimes">;
  //   _creationTime: number;
  //   endTime?: number | undefined;
  //   roomId: Id<"rooms">;
  //   movieId: Id<"movies">;
  //   startTime: number;


  const [form, setForm] = useState({
    movieId: "",
    roomId: "",
    startTime: 0,
    endTime: 0,

  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Showtimes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Showtimes</DialogTitle>
          <DialogDescription>
            Add an upcoming movie to your system
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-5 px-2 max-h-[50vh] overflow-y-auto">
            {/* <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                required
                id="title"
                name="title"
                value={form.movieId}
                onChange={handleChange}
                placeholder="How To Train Your Dragon"
              />
            </div> */}



          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
