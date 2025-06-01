"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddNewStudent() {
  const [open, setOpen] = useState(false);

  // Define the type for the form inputs using react-hook-form
  type Inputs = {
    name: string;
    matricNumber: string;
    exampleRequired: string;
  };
  // Initialize the form with useForm hook
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log("Form Data Submitted:", data);
    toast.success("New Student Added Successfully!");
    setOpen(false);
    reset(); // Reset the form after submission
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} className="bg-purple-900">
        + Add New Student
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-3">
                  <label className="mr-auto">Full Name</label>
                  <Input
                    placeholder="Enter Student Name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="py-3">
                  <label>Matric Number</label>
                  <Input
                    placeholder="Enter Student Matric Number"
                    {...register("matricNumber", { required: true })}
                  />
                </div>
                <div className="flex gap-2 items-center justify-end pt-4">
                  <Button onClick={() => setOpen(false)} variant={"ghost"}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
