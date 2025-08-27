import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react";
import { toast } from "sonner";



interface DeleteButtonProps {
    handleDelete: () => void;
}

export const DeleteButton = ( {handleDelete} : DeleteButtonProps ) => {

    const [open, setOpen] = useState(false);

    const deleteData = () => {
        try {
            handleDelete();
            toast.success("Data have been deleted");
            setOpen(false);
        } catch (err) {
            console.error("Fail to delete data: ", err);
            toast.error("Fail to delete data");
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>
                            Close
                        </Button>
                    </DialogClose>
                    <Button variant={"destructive"} onClick={deleteData}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}