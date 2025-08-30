import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useMutation } from "convex/react";
import { TriangleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import PhoneInput from 'react-phone-number-input';
import { api } from "../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";



interface CreatePhoneModelProps {
    phone: string | undefined;
}
export const CreatePhoneModel = ({ phone }: CreatePhoneModelProps) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [open, setOpen] = useState(!phone);
    const [error, setError] = useState("");
    const updatePhone = useMutation(api.users.updatePhone);
    const verifyPhoneTime = useMutation(api.users.phoneVerificationTime);
    const setDefaultRole = useMutation(api.users.setUserRole);

    useEffect(() => {
        setOpen(!phone); // check if there is no phone number
    }, [phone]);

    const handleClose = () => {
        if (!phone) {
            setOpen(!phone);
            setError("You must enter your phone number");
        } else {
            setOpen(false);
        }
        setPhoneNumber("");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            updatePhone({ phone: phoneNumber });
            verifyPhoneTime();
            setDefaultRole();
        } catch (err) {
            setError("Failed to update phone number !");
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="bg-secondary">
                <DialogHeader>
                    <DialogTitle>Enter your phone number</DialogTitle>
                </DialogHeader>
                {!!error && (
                    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
                        <TriangleAlert className="size-4" /> 
                        <p>{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-2.5">

                    <PhoneInput
                        international
                        defaultCountry="CA"
                        value={phoneNumber}
                        onChange={(value) => setPhoneNumber(value || "")}
                        placeholder="Enter Phone number"
                    />
                    <div className="flex justify-end">
                        <Button disabled={false}>
                            Add
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}